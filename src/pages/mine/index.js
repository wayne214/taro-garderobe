import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

import InfoItem from '../../components/InfoItem'
import message_img from '../../images/user/message.png';
import avatar_img from '../../images/user/avatar.png';
// import coupon_img from '../../images/user/coupon.png';
// import about_img from '../../images/user/about.png';
// import address_img from '../../images/user/address.png';

class index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  componentDidMount () {
    console.log('订单列表', this.props.list)
  }
  goToPage = (e) => {
    const url = e.currentTarget.dataset.url
    Taro.navigateTo({
      url
    })
  }

  goto = (e) => {
    console.log('e',e.currentTarget.dataset)
    const url = e.currentTarget.dataset.url

    Taro.navigateTo({
      url
    })
  }

  gotoLogin = (e) => {
    const url = e.currentTarget.dataset.url
    Taro.navigateTo({
      url
    })
  }
  render () {
    const {list, infoList} = this.props;
    return (
      <View className='user-page'>
        <View className='header-container' data-url='/pages/login/index' onClick={this.gotoLogin}>
          <View className='left-info'>
            <View className='name'>{'请登录>'}</View>
            <View className='msg-container' >
              <View className='msg'>
                <Image mode='widthFix' src={message_img} />
              </View>
              <View className='msg'>
                <Image mode='widthFix' src='http://static-r.msparis.com/uploads/9/a/9a00ce9a5953a6813a03ee3324cbad2a.png' />
              </View>
            </View>
          </View>

          <View className='avatar-container'>
            <Image mode='widthFix' className='avatar' src={avatar_img} />
          </View>
        </View>

        <View className='order'>
          {
            list && list.map((item)=>(
              <View className='item' key={item.type} data-url={`/pages/order/index?type=${index}`} onClick={this.goToPage}>
                <Image src={item.img} mode='widthFix' />
                <Text>{item.txt}</Text>
              </View>
            ))
          }
        </View>

        <View className='card'>
          <View className='type type0'>
            <View className='operation'>
              <View className='txt'>{'您还不是会员'}</View>
            </View>
          </View>
        </View>

        <View className='infoItem'>
          {
            infoList && infoList.map((item)=>(
              <InfoItem
                key={item.type}
                iconUrl={item.icon}
                url={item.url}
                onClick={this.goto}
                content={item.content}
              />
            ))
          }
        </View>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    list: state.user.list,
    infoList: state.user.infoList,
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
