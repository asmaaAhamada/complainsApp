import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Chip, Box, Button } from "@mui/material";
import { dark_green } from "../../../colors/colorsApp";
import Search from "../../hirareq/search";
import ADD_EMPLOYEES from "./addEmployees";

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
  const [openADD,setopenADD]=React.useState(false)

function handleadd(){
  setopenADD(true)
}

  
  return (
    <>
    <Box sx={{display:'flex' ,justifyContent:'Space_between' ,mb:2}}>
    <Search/>
     <Button
     onClick={handleadd}
  variant="contained"
  
  sx={{
    borderRadius: "10px",
    fontSize: { xs: "18px", sm: "20px", md: "24px" },
    fontWeight: "700",
    mt: { xs: "5%", sm: "15%", md: "5%" },
    width: { xs: "50%", sm: "40%", md: "80%" },
    mb: 2,
    textTransform: "none",
  }}
>
    اضافة موظف
</Button>
</Box>
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
              <TableCell sx={{color:'black'}}>{emp.name}</TableCell>
              <TableCell sx={{color:'black'}}  align="right">{emp.role}</TableCell>
              <TableCell  sx={{color:'black'}}  align="right">{emp.department}</TableCell>
             <TableCell 
  sx={{ color: emp.isActive ? 'green' : 'red', fontWeight: 'bold' }} 
  align="right"
>
  {emp.isActive ? "نشط" : "غير نشط"}
</TableCell>
              <TableCell align="right">
                <Stack direction="row" justifyContent="flex-end">
                  <IconButton sx={{color:dark_green}} size="small">
                    <EditIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



    <ADD_EMPLOYEES
     open={openADD}
  onClose={() => setopenADD(false)}
    
    
    />
    </>
  );
}
