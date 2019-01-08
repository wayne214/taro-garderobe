import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import { AtIcon } from 'taro-ui'

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
    console.log('订单列表', this.props.nickname)
    Taro.getStorage({key: 'user_info'}).then((res)=> {
      console.log('userInfo', res)
      if(res) {
        const userInfo = {
          access_token: res.data.access_token,
          invitation_code: res.data.invitation_code,
          mobile: res.data.mobile,
          nickname: res.data.nickname,
          new_user: res.data.new_user,
          is_has_buy_card: res.data.is_has_buy_card,
          erroMessage: '',
          code: ''
        };
        this.props.dispatch({
          type: 'user/saveUserInfo',
          payload: userInfo
        })
      }
    })
  }
  goToPage = (e) => {
    const url = e.currentTarget.dataset.url
    console.log(url)
    if(url == '/pages/login/index' && this.props.access_token){
      return
    }
    Taro.navigateTo({
      url
    })
  }
  loginOut = () => {
    if(!this.props.access_token) {
      Taro.navigateTo({
        url: '/pages/login/index',
      })
      return;
    }
    Taro.showModal({
      content: '是否退出当前账号?'
    }).then(res => {
      if (res.confirm) {
        Taro.removeStorageSync('user_info');
        Taro.removeStorageSync('access_token');

        const userInfo = {
          access_token: '',
          invitation_code: '',
          mobile: '',
          nickname: '',
          new_user: '',
          is_has_buy_card: '',
          erroMessage: '',
          code: ''
        };
        this.props.dispatch({
          type: 'user/saveUserInfo',
          payload: userInfo
        })

      }
    })
  }

  render () {
    const {list, infoList, nickname, mobile} = this.props;
    console.log('fhdffdfd', mobile, nickname)
    return (
      <View className='user-page'>
        <View className='header-container' data-url='/pages/login/index' onClick={this.goToPage}>
          <View className='left-info'>
            <View className={mobile ? 'name black' : 'name'}>{nickname || '请登录>'}</View>
            <View className='msg-container' >
              <View className='msg' data-url='/pages/message/index' onClick={this.goToPage}>
                <Image mode='widthFix' src={message_img} />
              </View>
              <View className='msg' onClick={this.loginOut}>
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
                <Text>{item.title}</Text>
              </View>
            ))
          }
        </View>

        <View className='card'>
          <View className='type type0'>
            <View className='operation'>
              <View className='txt'>{mobile ? 'VIP会员用户' : '您还不是会员'}</View>
              {
                !mobile && (
                  <View className='btn' data-url='/pages/login/index' onClick={this.goToPage}>
                    成为会员
                    <AtIcon value='chevron-right' size='20' />
                  </View>
                )
              }
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
                onClick={this.goToPage}
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
    nickname: state.user.nickname,
    access_token: state.user.access_token,
    mobile: state.user.mobile
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
