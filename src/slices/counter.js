import {createSlice} from 'redux-starter-kit'

const counter = createSlice({
  slice: 'counter', // slice is optional, and could be blank ''
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: (state, action) => state * action.payload
  }
})

export default counter
