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
        detail: res.data
      })
    })

  }


  handleClick = (value) => {
    console.log(value)
    this.props.dispatch(this.props.addToCar);
  }

  render () {
    const {banner, detail } = this.state
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
