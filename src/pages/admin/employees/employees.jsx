import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Chip, Box, Button, CircularProgress } from "@mui/material";
import { dark_green, defult } from "../../../colors/colorsApp";
import Search from "../../hirareq/search";
import ADD_EMPLOYEES from "./addEmployees";
import Edit_EMPLOYEES from "./editEmployees";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../slices/employees/fetchEmployees";
import NoData from "../../emptyData/no data";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteEmployees from "./deletEmployees";




export default function EmployeesTable() {

const employees = useSelector((state)=>state.fetchEmployees)
console.log(employees)
const { isLoading, error } = useSelector((state) => state.fetchEmployees);
const dispatch=useDispatch()

//fetch employees
React.useEffect(()=>{
  dispatch(fetchEmployees())
},[])
  const [openADD,setopenADD]=React.useState(false)
  const [openEdit,setopenEdit]=React.useState(false)
  const[openDelet,setopenDelete]=React.useState(false)
  //store employees
const [selectedid, setSelectedid] = React.useState(null);


//id
const [id, setid] = React.useState(null);

function handleadd(){
  setopenADD(true)
}

  function handleEdit(emp){
  setopenEdit(true)
  setSelectedid(emp);
}

 function handleDelete(id){
  setopenDelete(true)
  setid(id);
}
  return (
    <>
    <Box sx={{display:'flex' ,justifyContent:'Space_between' ,mb:2}}>
    
     <Button
     onClick={handleadd}
  variant="contained"
  
  sx={{
    borderRadius: "10px",
    fontSize: { xs: "18px", sm: "20px", md: "24px" },
    fontWeight: "700",
    mt: { xs: "5%", sm: "15%", md: "5%" },
    width: { xs: "30%", sm: "20%", md: "40%" },
    mb: 2,backgroundColor:dark_green,color:defult,
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
              البريد الالكتروني
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              القسم
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              رقم الهاتف
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>
              تعديل
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>


          
             {error ? (
  <Box> {error} </Box>
) : isLoading ? (
 <>
    
     <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress sx={{color:dark_green}} />
          </Box>
    </>
) : Array.isArray(employees?.data) && employees.data.length === 0 && !isLoading ? (
  <><NoData/></>
) : (
  Array.isArray(employees?.data) &&
  employees.data.map((emp) => (
    <TableRow key={emp.id}>
      <TableCell sx={{color:'black'}} >{emp.name}</TableCell>
      <TableCell sx={{color:'black'}} align="right">{emp.email}</TableCell>
      <TableCell sx={{color:'black'}} align="right">{emp.government_entities?.join(", ")}</TableCell>
      <TableCell sx={{color:'black'}}
        align="right"
      >
        {emp.phone}
      </TableCell>
       <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton sx={{color:dark_green}} size="small">
                    <EditIcon onClick={()=>handleEdit(emp)}/>
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon onClick ={()=>handleDelete(emp.id)} />
                  </IconButton>
                </Stack>
              </TableCell>
      {/* <TableCell align="right"> <Stack direction="row" justifyContent="flex-end"> <IconButton sx={{color:dark_green}} size="small"> <EditIcon onClick={handleEdit}/> </IconButton> </Stack> </TableCell> */}
    </TableRow>
  ))
)}

        </TableBody>
      </Table>
    </TableContainer>



    <ADD_EMPLOYEES
     open={openADD}
  onClose={() => setopenADD(false)}
              onSuccess={() => dispatch(fetchEmployees())}

    
    />

    <Edit_EMPLOYEES open={openEdit}
      onClose={() =>setopenEdit(false)}
          onSuccess={() => dispatch(fetchEmployees())}
employee={selectedid}
    />



    <DeleteEmployees
    open={openDelet}
     onClose={() =>setopenDelete(false)}
          onSuccess={() => dispatch(fetchEmployees())}
id={id}
    
    
    />
    </>
  );
}
