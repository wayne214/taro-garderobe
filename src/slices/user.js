import {createSlice} from 'redux-starter-kit'
import address_img from '../images/user/address.png'
import coupon_img from '../images/user/coupon.png'
import about_img from '../images/user/about.png'

const user = createSlice({
  slice: 'user',
  initialState: {
    list: [
      {
        txt: '待支付',
        img: 'http://static-r.msparis.com/uploads/d/e/de473a00fca2dae58c16decbd538347a.png',
        num: 0,
        link: '/userOrder.html?type=1',
        type: 2,
      },
      {
        txt: '待发货',
        img: 'http://static-r.msparis.com/uploads/1/a/1acfd9f403b338721bec4a0acd2af7c8.png',
        num: 0,
        link: '/userOrder.html?type=5',
        type: 3,
      },
      {
        txt: '已发货',
        img: 'http://static-r.msparis.com/uploads/7/b/7bd041417677878833efc599ffa43376.png',
        num: 0,
        link: '/userOrder.html?type=3',
        type: 9,
      },
      {
        txt: '待归还',
        img: 'http://static-r.msparis.com/uploads/e/9/e94bc2b990c1f87611529dba0a194c6e.png',
        num: 0,
        link: '/userOrder.html?type=6',
        type: 8,
      },
      {
        txt: '全部订单',
        img: 'http://static-r.msparis.com/uploads/b/b/bb575a6b318b47bae81b9acbba2f5fb8.png',
        num: 0,
        link: '/userOrder.html?type=0',
        type: 0,
      },
    ],
    infoList: [
      {
        icon: address_img,
        content: '收获地址',
        type: 'address',
        url: '/pages/addressList/index'
      },
      {
        icon: coupon_img,
        content: '优惠券',
        type: 'coupon',
        url: '/pages/couponList/index'
      },
      {
        icon: about_img,
        content: '关于',
        type: 'about',
        url: '/pages/about/index'
      }
    ]
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    }
  }
})

export default user
