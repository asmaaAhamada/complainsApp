import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGonverment } from "../../../slices/fetchgonverment";
import { dark_green } from "../../../colors/colorsApp";
import { Add_Employees, resetForm, setformInfo } from "../../../slices/employees/addEmployees";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "50%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 3,
};

export default function ADD_EMPLOYEES({ open, onClose }) {
const { data: departments } = useSelector((state) => state.fetchGonverment);
  const { name,email, password ,password_confirmation ,phone} = useSelector((state) => state.Add_Employees.formInfo);
const { isLoading, error,success } = useSelector((state) => state.Add_Employees);
  const dispatch = useDispatch();

useEffect(() => {
  if (success) {
    alert("تمت إضافة الموظف بنجاح!");
    dispatch(resetForm());
    onClose(); // يغلق المودال
  }
}, [success, dispatch, onClose]);
const [selectedDepartmentId, setSelectedDepartmentId] = useState('');


useEffect(() => {
  dispatch(fetchGonverment());
}, [dispatch]);


 function handlAddEmployees(departmentId) {
  if (!departmentId) {
    alert("رجاءً اختر الجهة أولاً");
    return;
  }
  dispatch(Add_Employees(departmentId));
}


  return (

<>
    {error && (
  <Box
    sx={{
      position: "fixed",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      bgcolor: "error.main",
      color: "#fff",
      p: 2,
      borderRadius: 2,
      zIndex: 1300, 
      boxShadow: 3,
    }}
  >
    {error}
  </Box>
)}



    <Modal open={open} onClose={onClose}>
    
      <Box sx={style}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{color:dark_green}} variant="h6">إضافة موظف</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="الاسم"
              name="name"
            value={name}
           onChange={(e) => dispatch(setformInfo({ name: e.target.value }))}
                      sx={{ input: { color: "black" }}}

            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="البريد الإلكتروني"
              name="email"
              value={email}
             onChange={(e) => dispatch(setformInfo({ email: e.target.value }))}
                        sx={{ input: { color: "black" }}}

            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="كلمة المرور"
              type="password"
              name="password"
           value={password}
          onChange={(e) => dispatch(setformInfo({ password: e.target.value }))}
                     sx={{ input: { color: "black" }}}

            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="تأكيد كلمة المرور"
              type="password"
              name="confirmPassword"
            value={password_confirmation}
           onChange={(e) => dispatch(setformInfo({ password_confirmation: e.target.value }))}
           sx={{ input: { color: "black" }}}
            />
          </Grid>

          {/* Dropdown لاختيار الجهة */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>الجهة</InputLabel>
              <Select
                name="department"
                value={selectedDepartmentId}
                onChange={(e) => setSelectedDepartmentId(e.target.value)}
              >
                {departments.data?.map((dep) => (
                  <MenuItem sx={{ color: "black" }} key={dep.id} value={dep.id}>
                    {dep.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="الهاتف"
              name="phone"
              value={phone }
              onChange={(e) => dispatch(setformInfo({ phone: e.target.value }))}
                         sx={{ input: { color: "black" }}}

            />
          </Grid>
        
        </Grid>

        {/* زر الإضافة */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: dark_green ,width:'100%'}}
            onClick={()=>{handlAddEmployees(selectedDepartmentId)}}
          >
            {isLoading? <CircularProgress/> :"إضافة"}
            
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
}
