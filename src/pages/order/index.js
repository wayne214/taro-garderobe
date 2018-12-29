import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import message_img from '../../images/user/message.png';
import avatar_img from '../../images/user/avatar.png';
import coupon_img from '../../images/user/coupon.png';
import about_img from '../../images/user/about.png';
import address_img from '../../images/user/address.png';

class index extends Component {
  config = {
    navigationBarTitleText: '订单'
  }

  componentDidMount () {

  }
  goToPage = (e) => {
    const url = e.currentTarget.dataset.url
    Taro.navigateTo({
      url
    })
  }
  render () {
    const {list} = this.props;
    return (
      <View className='order-page'>

      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    list: state.user.list
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
