import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () {

  }

  componentDidMount () {
    console.log(this.$router.params)
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  handleX = () => {
    console.log('sdsd')
  }

  render () {
    return (
      <View className='index2'>
        <Text>我的</Text>
      </View>
    )
  }
}