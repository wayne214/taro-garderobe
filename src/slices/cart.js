import {createSlice} from 'redux-starter-kit'
import Taro from '@tarojs/taro';

const cart = createSlice({
  slice: 'cart', // slice is optional, and could be blank ''
  initialState: {
    items: Taro.getStorageSync('items') || []
  },
  reducers: {
    save: (state, {payload}) => {
      Taro.setStorageSync('items',[
        ...state.items,
        ...payload.items,
      ]);
      return {...state, ...payload}
    },
    deleteClothes: (state, {payload}) => {
      const { id } = payload;
      const items = state.items.filter((item) => item.product_id != id);
      // 设置衣袋小红点
      if (items.length > 0) {
        Taro.setStorageSync('items',items);
        Taro.setTabBarBadge({
          index: 1,
          text: String(items.length),
        })
      }else {
        Taro.removeStorageSync('items');
        Taro.removeTabBarBadge({
          index: 1,
        })
      }
      return { ...state, ...{
          items
        }};
    }
  }
})

export default cart
