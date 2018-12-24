import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtAvatar } from 'taro-ui'
import logo from '../../images/logo-wechat.png'
import women from '../../images/women.jpeg'
import man from '../../images/man.jpg'
import child from '../../images/child.jpg'


import './index.scss'

import counterSlice from '../../slices/counter';
import userSlice from '../../slices/user';

const data = ['man', 'woman', 'child', 'man', 'woman', 'child']

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goto =(id) =>{
    console.log('type', id);
    Taro.navigateTo({
      url: `/pages/details/detail?type=${id}`
    })
  }
  render () {
    const {add, minus} = this.props
    return (
      <View className='todo'>
        {/*<Image src={logo} style={{alignSelf: 'center'}} />*/}
        <ScrollView
          className='scrollview'
          scrollX='true'
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%; margin-top: 10px'
          lowerThreshold='20'
          upperThreshold='20'
          // onScrolltoupper={this.onScrolltoupper}
          // onScroll={this.onScroll}
        >
          {
            data.map((item, index)=> {
              return <View key={item} className='header-icon-container' >
                <AtAvatar circle image='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545648401672&di=3880532945498a8f658f72edb0ac35cf&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20140615%2F20140615162949-1286630361.jpg' size='large' />
                <Text className='header-title'>{item}</Text>
              </View>
            })
          }
        </ScrollView>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay
          style='width: 375px'
        >
            <SwiperItem style={{width:500}}>
              <Image mode='widthFix' src={women} className='swiper__item'
                onClick={this.goto.bind(this, '女装')}
              />
            </SwiperItem>
            <SwiperItem>
              <Image mode='widthFix' src={child} className='swiper__item'
                onClick={this.goto.bind(this, '童装')}
              />
            </SwiperItem>
            <SwiperItem>
              <Image mode='widthFix' src={man} className='swiper__item'
                onClick={this.goto.bind(this, '男装')}
              />
            </SwiperItem>
        </Swiper>
        <ScrollView
          className='scrollview-bottom'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%; margin-top: 10px'
          lowerThreshold='20'
          upperThreshold='20'
          // onScrolltoupper={this.onScrolltoupper}
          // onScroll={this.onScroll}
        >
          <Image mode='widthFix' src={women} className='swiper__item' onClick={this.goto.bind(this, '女装')} />
          <Image mode='widthFix' src={child} className='swiper__item' onClick={this.goto.bind(this, '童装')} />
          <Image mode='widthFix' src={man} className='swiper__item' onClick={this.goto.bind(this, '男装')} />
        </ScrollView>
        <Button onClick={this.goto.bind(this,'111')}>跳转详情页</Button>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = {
    add: counterSlice.actions.increment,
    minus: counterSlice.actions.decrement
  };

export default connect(mapStateToProps, mapDispatchToProps)(Index)
