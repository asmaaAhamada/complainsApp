import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Log__in_Page from './pages/loginPage'
import DashboardLayout from './pages/hirareq/Layout'
import ComplaintsPage from './pages/admin/complaints/complain'
import ComplaintDetails from './pages/employeePage/details'
import EmployeesTable from './pages/admin/employees/employees'
import ComplaintsPieChart from './pages/admin/dashbord'
import ProtectedRoute from './protectedRout/proctedRout'
import Gonvernment from './pages/admin/gonvernment/fetchAll'
import Incoming_Complaints from './pages/employeePage/incomingComplaints'
import Panel from './pages/employeePage/panel'


export default function App(){
  return (
 <Routes>
  {/* صفحات عامة */}
  <Route path="/" element={<Log__in_Page />} />
  <Route path="/login" element={<Log__in_Page />} />

  {/* Dashboard Layout — نفس الواجهة للكل */}
  <Route element={<ProtectedRoute allowedRole={["المشرف العام", "الموظف"]} />}>
    <Route path="/app" element={<DashboardLayout />}>
      
      {/* ADMIN */}
      <Route path="dashboard" element={<ComplaintsPieChart />} />
      <Route path="complaints" element={<ComplaintsPage />} />
      <Route path="employees" element={<EmployeesTable />} />
      <Route path="gonvernments" element={<Gonvernment />} />

      {/* EMPLOYEE */}
      <Route path="complaint" element={<Incoming_Complaints />} />
      <Route path="panel" element={<Panel />} />

    </Route>
  </Route>
</Routes>


  )
}
