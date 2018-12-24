import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import './index.scss'
import women from '../../images/women.jpeg'
import man from '../../images/man.jpg'
import child from '../../images/child.jpg'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '详情页'
  }

  // constructor(props) {
  //   super(props)
  //   console.log('参数', this.$router.params);
  //
  // }

  componentWillMount () {
    console.log('参数', this.$router)
    Taro.setNavigationBarTitle({title: this.$router.params.type})
  }

  componentDidMount () {
    // console.log(this.$router.params)
    // Taro.setNavigationBarTitle({title: this.$router.params.type})
  }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  handleX = () => {
    console.log('sdsd')
  }

  render () {
    let imageUrl = '';
    const type = this.$router.params.type;
    if (type ==='女装') {
      imageUrl = women
    } else if (type === '男装') {
      imageUrl = man
    } else {
      imageUrl = child
    }
    return (
      <View className='index2'>
        <Image mode='widthFix' src={imageUrl} className='header-image' />
        <Text>发现</Text>
      </View>
    )
  }
}
