import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Chip } from "@mui/material";
import { dark_green } from "../../colors/colorsApp";

function createEmployee(name, role, department, isActive) {
  return { name, role, department, isActive };
}

const employees = [
  createEmployee("أحمد محمد", "مدير", "المبيعات", true),
  createEmployee("سارة علي", "محاسب", "المالية", true),
  createEmployee("محمود خالد", "دعم فني", "الدعم التقني", false),
  createEmployee("نور رامي", "HR", "الموارد البشرية", true),
];

export default function EmployeesTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employees table">
        <TableHead>
          <TableRow sx={{ backgroundColor: dark_green }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              اسم الموظف
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              الصلاحيات
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              القسم
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              الحالة
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              تعديل
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.name}>
              <TableCell>{emp.name}</TableCell>
              <TableCell align="right">{emp.role}</TableCell>
              <TableCell align="right">{emp.department}</TableCell>
              <TableCell align="right">
                <Chip
                  label={emp.isActive ? "نشط" : "غير نشط"}
                  color={emp.isActive ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" justifyContent="flex-end">
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
