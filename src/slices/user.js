import {createSlice} from 'redux-starter-kit'
import address_img from '../images/user/address.png'
import coupon_img from '../images/user/coupon.png'
import about_img from '../images/user/about.png'

const user = createSlice({
  slice: 'user',
  initialState: {
    list: [
      {
        title: '待支付',
        img: 'http://static-r.msparis.com/uploads/d/e/de473a00fca2dae58c16decbd538347a.png',
        num: 0,
        link: '/userOrder.html?type=1',
        type: 2,
      },
      {
        title: '待发货',
        img: 'http://static-r.msparis.com/uploads/1/a/1acfd9f403b338721bec4a0acd2af7c8.png',
        num: 0,
        link: '/userOrder.html?type=5',
        type: 3,
      },
      {
        title: '已发货',
        img: 'http://static-r.msparis.com/uploads/7/b/7bd041417677878833efc599ffa43376.png',
        num: 0,
        link: '/userOrder.html?type=3',
        type: 9,
      },
      {
        title: '待归还',
        img: 'http://static-r.msparis.com/uploads/e/9/e94bc2b990c1f87611529dba0a194c6e.png',
        num: 0,
        link: '/userOrder.html?type=6',
        type: 8,
      },
      {
        title: '全部订单',
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
    ],
    mobile: '',
    code: '',
    sending: 0,
    errorMessage: '',
    smsTime: 30,
    userInfo: {},
    access_token: '',
    invitation_code: '',
    nickname: '',
    new_user: '',
    is_has_buy_card: '',
    addressList: []
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
    saveMobile: (state, action) => {
      state.mobile = action.payload.mobile
    },
    saveCode: (state, action) => {
      state.code = action.payload.code
    },
    saveStatus: (state, action) => {
      state.sending = action.payload.sending,
      state.errorMessage = action.payload.errorMessage,
      state.smsTime = action.payload.smsTime
    },
    saveUserInfo: (state, action) => {
      // console.log('用户信息', action.payload)
      state.access_token = action.payload.access_token,
      state.invitation_code = action.payload.invitation_code,
      state.nickname = action.payload.nickname,
      state.new_user = action.payload.new_user,
      state.errorMessage = action.payload.errorMessage,
      state.code = action.payload.code,
      state.mobile = action.payload.mobile
    },
    saveAddressList: (state, action) => {
      state.addressList = action.payload.addressList
    }
  }
})

export default user
