import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Log__in_Page from './pages/loginPage'
import DashboardLayout from './pages/hirareq/Layout'
import ComplaintsPage from './pages/employeePage/complain'
import ComplaintDetails from './pages/employeePage/details'
import EmployeesTable from './pages/admin/employees'


export default function App(){
  return (
   <>
   {/* //<Log__in_Page/> */}
   {/* ==================adminRouting======================= */}
   <Routes>
                    <Route path="/" element={<DashboardLayout />}>
          {/* <Route index element={<DashboardPage />} /> */}
           <Route path="/complaints" element={<ComplaintsPage />} />
                      <Route path="/employees" element={<EmployeesTable />} />



        </Route>
</Routes>
   {/* ==================adminRouting======================= */}
   </>
  )
}
