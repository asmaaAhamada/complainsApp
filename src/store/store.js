import { configureStore } from '@reduxjs/toolkit'
import Log_inReducer from "../slices/log_in_Slice"
import userReducer from "../slices/userInfo"
import fetchComplaintsReducer from "../slices/complaints/fetch"
import fetchGonvermentReducer from "../slices/gonvernment/fetchgonverment"
import Add_EmployeesReducer from "../slices/employees/addEmployees"
import Edit_EmployeesReducer from "../slices/employees/editEmployees"
import fetchEmployeesReducer from "../slices/employees/fetchEmployees"
import deletEmployeesReducer from "../slices/employees/delet"
import StatisticsReducer from "../slices/victory/adminSatics"
import Add_GonvermentsReducer from "../slices/gonvernment/addGonverment"
export default configureStore({
  reducer: {
    Log_in:Log_inReducer,
    user:userReducer,
    fetchComplaints:fetchComplaintsReducer,
    fetchGonverment:fetchGonvermentReducer,
    Add_Employees:Add_EmployeesReducer,
    Edit_Employees:Edit_EmployeesReducer,
    fetchEmployees:fetchEmployeesReducer,
    deletEmployees:deletEmployeesReducer,
    Statistics:StatisticsReducer,
    Add_Gonverments:Add_GonvermentsReducer
  }
})
