import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from "../slices/log_in_Slice"
import userReducer from "../slices/userInfo"
import fetchComplaintsReducer from "../slices/complaints/fetch"
import fetchGonvermentReducer from "../slices/fetchgonverment"
import Add_EmployeesReducer from "../slices/employees/addEmployees"
// import fetchEmployeesReducer from "../slices/employees/fetchEmployees"

export default configureStore({
  reducer: {
    Log_in:Log_inReducer,
    user:userReducer,
    fetchComplaints:fetchComplaintsReducer,
    fetchGonverment:fetchGonvermentReducer,
    Add_Employees:Add_EmployeesReducer,
    // fetchEmployees:fetchEmployeesReducer
  }
})
