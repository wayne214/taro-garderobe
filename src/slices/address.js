import {createSlice} from 'redux-starter-kit'
import Taro from '@tarojs/taro';

const cart = createSlice({
  slice: 'address', // slice is optional, and could be blank ''
  initialState: {
    addressId: '',
    cities: [],
    districts: [],
    pickerValue: [0, 0, 0],
    showValue: {
      region_code: '',
      region_name: ''
    },
    contact_name: '',
    contact_mobile: '',
    address_detail: '',
    currentIndex: 0
  },
  reducers: {
    getDistricts: (state, {payload}) => {

      const cities = payload.address.data;
      const arr = [[], [], []]
      cities.forEach(item => {

        arr[0].push({
          key: item.key,
          name: item.name,
        })
      });
      cities[0].cities.forEach(item => {
        arr[1].push({
          key: item.key,
          name: item.name,
        })
      })
      cities[0].cities[0].regions.forEach(item => {
        arr[2].push({
          key: item.key,
          name: item.name,
        })
      });
      // console.log('city-item', arr)
      state.cities = cities
      state.districts = arr

    },

    updateDistricts: (state, action) => {
      state.districts = action.payload.districts
    },

    currentIndex: (state, action) => {
      state.currentIndex = action.payload.currentIndex
    },

    savePickValue: (state, action) => {
      state.pickerValue = action.payload.pickerValue,
      state.showValue = action.payload.showValue
    },
    saveInput: (state, action) => {
      const payload = action.payload
      if (payload.id === 'contact_name') {
        state.contact_name = action.payload.value
      }

      if (payload.id === 'contact_mobile') {
        state.contact_mobile = action.payload.value
      }
      if (payload.id === 'address_detail') {
        state.address_detail = action.payload.value
      }
    },
    save: (state, action) => {
        state.addressId = action.payload.addressId
        state.showValue = action.payload.showValue
        state.contact_name = action.payload.contact_name
        state.contact_mobile = action.payload.contact_mobile
        state.address_detail = action.payload.address_detail
    }
  }
})

export default cart
