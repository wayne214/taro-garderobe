import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

class index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  componentDidMount () {

  }
  login = (e) => {
    const url = e.currentTarget.dataset.url
    Taro.navigateTo({
      url
    })
  }

  render () {
    return (
      <View className='login-page'>
        <View>登录页面</View>
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
