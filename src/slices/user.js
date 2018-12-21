import {createSlice} from 'redux-starter-kit'

const user = createSlice({
  slice: 'user',
  initialState: { name: '' },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    }
  }
})

export default user
