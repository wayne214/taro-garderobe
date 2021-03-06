import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class mine extends Component {
  config = {
    navigationBarTitleText: '尺码参照表'
  }

  componentWillMount () {

  }

  componentDidMount () {
    console.log(this.$router.params)
  }

  render () {
    return (
      <View className='size-page'>
        <View className='h1'>尺码参照表</View>
        <View className='content'>
          <Image mode='widthFix' src='http://static-r.msparis.com/uploads/4/1/41a3586b776c954032b56ef117bd4ad7.png' />
          <Text>Tips：本表内容仅供参考，因服装款式和材质不同，尺码可能略有差异，请酌情进行选择。</Text>
        </View>
      </View>
    )
  }
}
