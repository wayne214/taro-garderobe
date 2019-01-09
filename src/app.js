import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import store from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/cart/index',
      'pages/mine/index',
      'pages/details/detail',
      'pages/shoppingCar/shoppingCar',
      'pages/search/search',
      'pages/size/index',
      'pages/order/index',
      'pages/message/index',
      'pages/login/index',
      'pages/about/index',
      'pages/addressList/index',
      'pages/addressUpdate/index',
      'pages/couponList/index',
      'pages/news/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#626567',
      selectedColor: '#2A8CE5',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './images/tab/home.png',
        selectedIconPath: './images/tab/home-active.png'
      },
        {
        pagePath: 'pages/cart/index',
        text: '衣袋',
        iconPath: './images/tab/cart.png',
        selectedIconPath: './images/tab/cart-active.png'
      },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: './images/tab/user.png',
          selectedIconPath: './images/tab/user-active.png'
        }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>

    )
  }
}

Taro.render(<App />, document.getElementById('app'))
