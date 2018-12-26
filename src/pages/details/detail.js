import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtActionSheet, AtActionSheetItem, AtIcon } from 'taro-ui'
// import './index.scss'
import women from '../../images/women.jpeg'
import man from '../../images/man.jpg'
import child from '../../images/child.jpg'

import './detail.scss'

const size=['XS(160/80A)','S(165/84A)','M(170/88A)','L(175/96A)','XL(175/100A)'];

export default class detail extends Component {
  config = {
    navigationBarTitleText: '详情页'
  }

  constructor(props) {
    super(props)
    console.log('参数', this.$router.params);
    this.state={
      sheetState: false
    }

  }

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
    this.setState({
      sheetState: true
    })
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
        <AtButton type='primary' size='normal' onClick={this.handleX}>添加</AtButton>
        <AtActionSheet isOpened={this.state.sheetState}>
          {
            size.map((item)=> {
              return <AtActionSheetItem key={item}>{
                item
              }</AtActionSheetItem>
            })
          }
          <AtActionSheetItem>
            查看我的尺码
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
