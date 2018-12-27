import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.scss'

export default class index extends Component {
  config = {
    navigationBarTitleText: '发现'
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
        <Text>发现</Text>
      </View>
    )
  }
}
