import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import cartSlice from "../../slices/cart";
import './index.scss'
import ClothingsItem from '../../components/ClothingsItem'

class Cart extends Component {
  config = {
    navigationBarTitleText: '衣袋'
  }

  componentDidMount () {
    console.log(this.props.items)
    // 设置小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length)
      })
    } else {
      Taro.removeTabBarBadge({
        index: 1
      })
    }

  }
  goHome() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      Taro.navigateTo({
        url: '/pages/index/index',
      })
    }else {
      Taro.switchTab({
        url: '/pages/index/index',
      })
    }
  }

  clothingNumExplain = () => {
    const content = "“会员每次免费租4件”可付费多租一件，5件封顶；VIP每次免费可租4件会员+1件VIP美衣或者2件会员+2件VIP美衣，或者3件VIP美衣；可付费多租1-2件，5件封顶；";
    Taro.showModal({
      content,
      showCancel: false,
    })
  }
  buy = () => {
    Taro.showToast({
      title: '衣袋尚未激活，下单失败～～',
      icon: 'none'
    });
  }

  onDeleteClothing =(e) => {
    console.log('id',e)
    const id = e.currentTarget.dataset.id;
    Taro.showModal({
      content:'是否删除该美衣?'
    })
      .then(res => {
        if (res.confirm) {
          this.props.dispatch({
            type: 'cart/deleteClothes',
            payload: {
              id
            },
          });
        }
      })
  }

  render () {
    const {items} = this.props;
    return (
      <View className='cart-page'>
        {
          items.length === 0 ? (
            <View className='empty'>
              <Image mode='widthFix' src='http://static-r.msparis.com/uploads/b/c/bcffdaebb616ab8264f9cfc7ca3e6a4e.png' />
              <Button type='primary' className='am-button' onClick={this.goHome}>立即去挑选美衣</Button>
            </View>
          ) : (
            <View className='isLogin'>
              <Image onClick={this.clothingNumExplain} mode='widthFix' src='https://static-rs.msparis.com/uploads/1/0/106494e4c47110f6c0e4ea40e15ad446.png' />
              <ClothingsItem className='items' clothing={items} onDeleteClothing={this.onDeleteClothing} />
              <View className='bottom-count' style={'bottom:0;'}>
                <View className='fj'>
                  <View>
                    合计：
                    <Text className={!items.length ? 'disabled price' : 'price'}>0.00</Text>
                  </View>
                  <Button className='cart-btn' onClick={this.buy} disabled={!items.length}>下单</Button>
                  <View className='info'>
                    如有失效美衣，建议删除，以免占用衣袋件数
                  </View>
                </View>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    items: state.cart.items
  }
}

const mapDispatchToProps = {
  save: cartSlice.actions.save,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
