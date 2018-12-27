import {createSlice} from 'redux-starter-kit'
import * as homeApi from '../pages/index/service';

const shoppingSlice = createSlice({
  slice: 'shoppingSlice',
  initialState: {
    banner: [],
    brands: [],
    products_list: [],
    page: 1
  },
  reducers: {
    addToCar: (state, action) => {
      console.log('action',action.payload)
      state[0]= action.payload.banner
    },
  }
})

export default shoppingSlice
