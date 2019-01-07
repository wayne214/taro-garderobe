import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import * as LoginApi from './service'

let setIntervalTime = null;
class index extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  constructor(props) {
    super(props)
    this.state = {
      smsText: '发送验证码',
      sending: 0,
      smsTime: 30,
      erroMessage: '',
    }
  }
  componentDidMount () {

  }

  // tips
  showToast(text) {
    Taro.showToast({
      title: text,
      icon: 'none',
    });
  }
  login = () => {
    if (this.props.mobile == '' || this.props.mobile.length != 11 || this.props.code == '' || this.props.code.length != 4) {
      this.showToast('请输入有效的手机号或输入有效验证码！');
      return false;
    }

    LoginApi.login({
      code: this.props.code,
      mobile: this.props.mobile
    }).then((res)=> {
      console.log('res',res);
      if (res.status === 'ok') {

      } else {
        this.showToast(res.error.message)
      }
    })
  }
  getMobile = (event) => {
    const value = event.target.value;
    this.props.dispatch({
      type: 'user/saveMobile',
      payload: {mobile: value}
    })
  }

  getVoiceCode = (event) => {
    const value = event.target.value;
    // this.props.dispatch({
    //   type: 'user/saveMobile',
    //   payload: {mobile: value}
    // })
  }

  sendSms = () => {
    const mobile = this.props.mobile
    if (mobile === '' || mobile.length !== 11){
      this.showToast('请输入有效的手机号!')
      return false
    }
    LoginApi.getSms({
      mobile
    }).then((res)=> {
      if (res.status === 'ok') {
        this.props.dispatch({
          type: 'login/save',
          payload: { sending: 1, erroMessage: '' },
        });
        this.setIntervalTime()
      } else {
        this.props.dispatch({
          type: 'login/save',
          payload: { sending: 2, erroMessage: res.error && res.error.message },
        });
        clearInterval(setIntervalTime);
        this.showToast(res.error.message);
      }

    })
  }


  setIntervalTime = () => {
    clearInterval(setIntervalTime);
    let numConst = 30;
    setIntervalTime = setInterval(() => {
      numConst--;
      this.props.dispatch({
        type: 'user/saveStatus',
        payload: { sending: 1, smsTime: numConst },
      });

      this.setState({
        sending: 1,
        smsTime: numConst
      })

      if (numConst == 0 || (this.props.erroMessage && this.props.erroMessage != '')) {
        clearInterval(setIntervalTime);
        this.props.dispatch({
          type: 'user/saveStatus',
          payload: { sending: 2, erroMessage: '', smsTime: 30 },
        });
        this.setState({
          sending: 2,
          smsTime: 30,
          erroMessage:''
        })
      }
    }, 1000);
  }
  // 获取验证码
  getCode = (event) => {
    const value = event.target.value;
    console.log('value', value)
    this.props.dispatch({
      type: 'user/saveCode',
      payload: {code: value}
    })
  }
  render () {
    const { sending, smsTime } = this.state;

    return (
      <View className='login-page'>
        <View className='title'>您好，请登录</View>
        <View className='title-des'>新用户注册即享18天会员98元</View>

        <View className='login-wrap'>
          <View className='mobile-wrap'>
            <Input
              type='number'
              name='mobile'
              maxLength='11'
              placeholder='请输入手机号'
              value={this.props.mobile}
              onInput={this.getMobile}
            />
          </View>

          <View className='mobile-number'>
            <Input
              type='number'
              name='code'
              maxLength='4'
              placeholder='请输入验证码'
              value={this.props.code}
              onInput={this.getCode}
            />
            {
              sending == 2 && <View className='numberWrap' onClick={this.sendSms}>重新获取</View>
            }
            {
              sending == 1 && <View className='numberWrap' >{`${smsTime}秒后重发`}</View>
            }
            {
              sending == 0 && <View className='numberWrap' onClick={this.sendSms}>获取验证码</View>
            }
          </View>

          <Button className='button' onClick={this.login}>登录</Button>
          <View className='see-des' onClick={this.getVoiceCode}>
            收不到短信？
            <Text>使用语音验证码</Text>
          </View>
        </View>

      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    mobile: state.user.mobile,
    code: state.user.code
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index)
