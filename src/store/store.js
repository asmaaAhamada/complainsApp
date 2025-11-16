import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from "../slices/log_in_Slice"
import userReducer from "../slices/userInfo"
export default configureStore({
  reducer: {
    Log_in:Log_inReducer,
    user:userReducer
  }
})
