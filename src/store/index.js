import { configureStore, getDefaultMiddleware, createSlice, combineReducers } from 'redux-starter-kit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

import cartSlice from '../slices/cart'
import userSlice from '../slices/user'
import shoppingcarSlice from '../slices/shoppingcar'


const middleware = [...getDefaultMiddleware(), logger]

const reducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  shoppingSlice: shoppingcarSlice.reducer
})

const store = configureStore({
  reducer,
  middleware,
  devTools: true,
})

export default store
