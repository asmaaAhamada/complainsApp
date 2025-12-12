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
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGonverment } from "../../../slices/gonvernment/fetchgonverment";
import { dark_green } from "../../../colors/colorsApp";
import { Edit_Employees, resetForm, setformInfo } from "../../../slices/employees/editEmployees";

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

export default function Edit_EMPLOYEES({ open, onClose, employee, onSuccess }) {
  const { data: departments } = useSelector((state) => state.fetchGonverment);
  const { name, email, password, password_confirmation, phone } =
    useSelector((state) => state.Edit_Employees.formInfo);
  const { isLoading, error, success } = useSelector((state) => state.Edit_Employees);

  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  // تعبئة البيانات عند فتح المودال
  useEffect(() => {
    if (employee) {
      dispatch(
        setformInfo({
          name: employee.name || "",
          email: employee.email || "",
          originalEmail: employee.email || "",
          phone: employee.phone || "",
          password: "",
          password_confirmation: "",
          government_entity_id: employee.government_entity_id || "",
        })
      );
      setSelectedDepartmentId(employee.government_entity_id || "");
    }
  }, [employee, dispatch]);

  // عند نجاح عملية التعديل
  useEffect(() => {
    if (success) {
      setShowSuccess(true); // عرض رسالة النجاح
      if (onSuccess) onSuccess(); // إعادة تحميل الموظفين
      dispatch(resetForm()); // تصفير حقول الفورم
      onClose(); // إغلاق المودال
    }
  }, [success, dispatch, onClose, onSuccess]);

  // جلب الجهات الحكومية
  useEffect(() => {
    dispatch(fetchGonverment());
  }, [dispatch]);

  function handlEditeEmployees(employeeId) {
    dispatch(Edit_Employees(employeeId));
  }

  return (
    <>
      {/* رسالة الخطأ */}
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

      {/* Snackbar النجاح (خارج المودال) */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          تم تعديل الموظف بنجاح
        </Alert>
      </Snackbar>

      {/* المودال */}
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ color: dark_green }} variant="h6">
              تعديل موظف
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="الاسم"
                value={name}
                onChange={(e) => dispatch(setformInfo({ name: e.target.value }))}
                sx={{ input: { color: "black" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                value={email}
                onChange={(e) => dispatch(setformInfo({ email: e.target.value }))}
                sx={{ input: { color: "black" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="كلمة المرور"
                type="password"
                value={password}
                onChange={(e) => dispatch(setformInfo({ password: e.target.value }))}
                sx={{ input: { color: "black" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="تأكيد كلمة المرور"
                type="password"
                value={password_confirmation}
                onChange={(e) => dispatch(setformInfo({ password_confirmation: e.target.value }))}
                sx={{ input: { color: "black" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>الجهة</InputLabel>
                 <Select
  value={selectedDepartmentId}
  onChange={(e) => {
    setSelectedDepartmentId(e.target.value);
    dispatch(setformInfo({ government_entity_id: e.target.value }));
  }}
  sx={{
    color: "black", // النص بعد الاختيار يكون أسود
    "& .MuiSelect-icon": { color: "black" }, // السهم أسود
  }}
>
                  {departments.data?.map((dep) => (
                    <MenuItem  sx={{ color: "black" }} key={dep.id} value={dep.id}>
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
                value={phone}
                onChange={(e) => dispatch(setformInfo({ phone: e.target.value }))}
                sx={{ input: { color: "black" } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: dark_green, width: "100%" }}
              onClick={() => handlEditeEmployees(employee.id)}
            >
              {isLoading ? <CircularProgress /> : "حفظ"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
