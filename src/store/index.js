import { configureStore, getDefaultMiddleware, createSlice, combineReducers } from 'redux-starter-kit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

import counterSlice from '../slices/counter'
import userSlice from '../slices/user'
import shoppingcarSlice from '../slices/shoppingcar'


const middleware = [...getDefaultMiddleware(), logger]

const reducer = combineReducers({
  counter: counterSlice.reducer,
  user: userSlice.reducer,
  shoppingSlice: shoppingcarSlice.reducer
})

const store = configureStore({
  reducer,
  middleware,
  devTools: true,
})

export default store
