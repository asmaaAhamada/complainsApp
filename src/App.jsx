import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Log__in_Page from './pages/loginPage'
import DashboardLayout from './pages/hirareq/Layout'
import ComplaintsPage from './pages/employeePage/complain'
import ComplaintDetails from './pages/employeePage/details'
import EmployeesTable from './pages/admin/employees/employees'
import ComplaintsPieChart from './pages/admin/dashbord'
import ProtectedRoute from './protectedRout/proctedRout'


export default function App(){
  return (
   <>
   
   <Routes>
   <Route path="/" element={<Log__in_Page />} />
    <Route path="/login" element={<Log__in_Page />} />
   {/* ==================adminRouting======================= */}
             <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedRoute allowedRole={"Super Admin"} />}>

                    <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<ComplaintsPieChart />} />
           <Route path="/app/complaints" element={<ComplaintsPage />} />
                      <Route path="/app/employees" element={<EmployeesTable />} />
                                            <Route path="/app/dashboard" element={<ComplaintsPieChart />} />

 </Route>

 </Route>
        </Route>
</Routes>
   {/* ==================adminRouting======================= */}
   </>
  )
}
