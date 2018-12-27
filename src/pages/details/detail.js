import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as detailApi from './service'
import MySwiper from '../../components/MySwiper'

import './detail.scss'

import shoppingcarSlice from "../../slices/shoppingcar";

class detail extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state={
      banner: [],
      detail: {},
      specificationsList: [],
      currentChooseId: '',
      currentChooseName: ''
    }

  }

  componentDidMount () {
    detailApi.getProductInfo({
      id: this.$router.params.id
    }).then((res)=> {
      console.log('物品详情',res)
      const banner = res.data.image.map((item)=> {
        return {
          image_src: item
        }
      })
      Taro.setNavigationBarTitle({
        title: res.data.name
      })
      this.setState({
        banner,
        detail: res.data,
        specificationsList: res.data.specifications
      })
    })

  }

  computedStyle = (item) => {
    let str = '';
    if (item.id == this.state.currentChooseId) {
      str = 'size on';
    } else {
      str = 'size';
    }
    if (item.has_stock != 1) {
      str = 'size off';
    }
    return str;
  }

  chooseSize = (e) => {
    console.log("选择的尺寸",e)
    const {has_stock, id, name} = e.currentTarget.dataset
    if (has_stock == 1) {
      if (id == this.state.currentChooseId) {
        this.setState({
          currentChooseId: '',
          currentChooseName: ''
        })
      } else {
        this.setState({
          currentChooseId: id,
          currentChooseName: name
        })
      }
    }
  }
  openSizeTable = () => {
    Taro.navigateTo({
      url: '/pages/size/index'
    })
  }

  goToPage = (e) => {
    Taro.switchTab({
      url: e.currentTarget.dataset.url,
    })
  }

  makePhoneCall() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.location.href = "tel:123456";
    }else {
      Taro.makePhoneCall({
        phoneNumber: '123456'
      })
    }
  }
  render () {
    const {banner, detail, specificationsList, currentChooseId } = this.state
    return (
      <View className='detail-container'>
        <View className='image-box-wrap'>
          <View className='image-box clearfix'>
            <MySwiper banner={banner} />
            <View className='share-btn'>
              <Button open-type='share' />
            </View>
          </View>

        </View>

        <View className='container'>
          {/*商品信息*/}
          <View className='info-business-card'>
            <View className='name'>{detail.brand}</View>
            {
              (detail.market_price / 100 > 500) && (
                <View className='model'>
                  参考价 ￥{detail.market_price / 100}
                </View>
              )
            }
          </View>

          <View className='product-name'>
            { detail.type_id == 2 && detail.mode_id == 1 && <View>VIP</View> }
            {detail.name}
          </View>

          <View className='product-code'>
            {detail.product_spu}
          </View>

          <View className='product-size'>
            {
              specificationsList && specificationsList.length > 0 && specificationsList.map((spe)=>{
                return (
                  <View key={spe.id}>
                    {
                      spe && spe.options && spe.options.map((item)=> (
                        <View key={item.id}>
                          {
                            spe.name === '中码' ? (
                              <View className={this.computedStyle(item)} data-has_stock={item.has_stock} data-id={item.id} data-name={item.name} onClick={this.chooseSize}>
                                {
                                  item.name == '均码' ? <View>均码</View> : (
                                    <View>{`${spe.name}${item.value}号`}</View>
                                  )
                                }
                              </View>
                            ): (
                              <View className={this.computedStyle(item)} data-has_stock={item.has_stock} data-id={item.id} data-name={item.name} onClick={this.chooseSize}>
                                <View className="double">
                                  {`${spe.name}${item.name}号`}
                                </View>
                                <View className="double font">
                                  {`中码${item.value}号`}
                                </View>
                              </View>
                            )
                          }
                        </View>
                        )
                      )
                    }
                  </View>
                )
              })
            }
          </View>

          <View className='product-size-line' onClick={this.openSizeTable}>
            <View className='clearfix'>
              <View className='icon-tag' />
              <View className='text'>各国尺码转换表</View>
            </View>
          </View>
        </View>

        {/*// 底部操作栏*/}
        <View className='detail-bottom-btns'>
          <View className='nav' data-url='/pages/home/index' onClick={this.goToPage}>
            <Image className='nav-img' src={require('../../images/tab/home.png')} alt='' />
            首页
          </View>
          <View className='nav' onClick={this.makePhoneCall}>
            <Image className='nav-img' src={require('../../images/icon/customerservice.png')} alt='' />
            客服
          </View>
          <View className='nav' data-url='/pages/cart/index' onClick={this.goToPage}>
            <Image className='nav-img' src={require('../../images/tab/cart.png')} alt='' />
            衣袋
            {/*{ items.length > 0 && <View className='zan-badge__count'>{items.length}</View> }*/}
          </View>
          <View className={currentChooseId == '' ? 'join join-disabled' : 'join'} onClick={this.join}>加入衣袋</View>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    shoppingSlice: state.shoppingSlice
  }
}

const mapDispatchToProps = {
  addToCar: shoppingcarSlice.actions.addToCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(detail)
