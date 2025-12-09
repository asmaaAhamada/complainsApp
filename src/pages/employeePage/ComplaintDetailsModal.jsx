import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";

import {
  BadgeOutlined,
  PersonOutline,
  Business,
  Category,
  Description,
  InfoOutlined,
  PlaceOutlined,
  ScheduleOutlined,
  UpdateOutlined,
  AttachFileOutlined
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { fetchComplaintsincoming } from "../../slices/manegerAdmin/details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dark_green, light_green, red } from "../../colors/colorsApp";
import { Edit_Status, setformInfo } from "../../slices/manegerAdmin/editStatus";

export default function ComplaintDetailsModal({ open, onClose, complaintId }) {
  const dispatch = useDispatch();
const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isloading, error } = useSelector(
    (state) => state.fetchComplaintsincoming
  );

//Edit_Status
  const status = useSelector((state) => state.Edit_Status.formInfo.status);
console.log(status);
const {  Loading, Error } = useSelector(
  (state) => state.Edit_Status
);

  
function handleEdit(newStatus) {
  dispatch(setformInfo({ status: newStatus })); // ← تحديث الحالة
  return dispatch(Edit_Status(complaintId))
    .then((response) => {
if (response.meta.requestStatus === "fulfilled"){
        setSuccessMessage("تم تعديل الحالة بنجاح ✔");
        onClose();
      } else {
        setErrorMessage(response.payload || "حدث خطأ أثناء تعديل الحالة ❌");
      }
    });
}




//Edit_Status///////////////////
  useEffect(() => {
    if (open && complaintId) {
      dispatch(fetchComplaintsincoming(complaintId));
    }
  }, [dispatch, complaintId, open]);

  if (isloading)
    return <CircularProgress sx={{ m: 5, color: dark_green }} />;
  if (error)
    return <Typography color="error">{error}</Typography>;

  const complaint = data?.data;
  if (!complaint) return null;

  const infoItem = (icon, label, value) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box sx={{ color: dark_green, mr: 1 }}>{icon}</Box>

      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: dark_green }}
        >
          {label}
        </Typography>

        <Typography variant="body2" sx={{ color: "black" }}>
          {value || "غير متوفر"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: dark_green, fontWeight: "bold" }}>
        تفاصيل الشكوى
      </DialogTitle>
 <IconButton
          onClick={onClose}
          sx={{ position: "absolute", left: 16, top: 16, color: dark_green }}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent>
        <Grid container spacing={3}>

          {/* العمود الأول */}
          <Grid item xs={12} md={6}>
            {infoItem(<BadgeOutlined />, "رقم المرجع:", complaint.reference_number)}
            {infoItem(<PersonOutline />, "اسم المستخدم:", complaint.user_name)}
            {infoItem(<Business />, "الجهة الحكومية:", complaint.government_entity)}
            {infoItem(<Category />, "نوع الشكوى:", complaint.complaint_type)}
            {infoItem(<InfoOutlined />, "الحالة:", complaint.status)}
          </Grid>

          {/* العمود الثاني */}
          <Grid item xs={12} md={6}>
            {infoItem(<Description />, "الوصف:", complaint.problem_description)}
            {infoItem(<PlaceOutlined />, "الوصف المكاني:", complaint.location_description)}
            {infoItem(<ScheduleOutlined />, "تاريخ الإنشاء:",  new Date(complaint.created_at).toLocaleDateString())}
            {infoItem(<UpdateOutlined />, "تاريخ التعديل:", new Date(complaint.updated_at).toLocaleDateString())}
            {infoItem(
              <AttachFileOutlined />,
              "المرفقات:",
              complaint.attachments?.length
                ? `${complaint.attachments.length} ملف`
                : "لا توجد مرفقات"
            )}
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
       
        <Button sx={{backgroundColor:dark_green}} 
        disabled={Loading}
         onClick={async () => {
    try {
      await handleEdit( "منجزة");
      onClose();
    } catch {
    }
  }}
        
        variant="outlined">
                    قبول
                  </Button>
                  <Button 
                  
                   
         onClick={async () => {
    try {
      await handleEdit( "مرفوضة");
      onClose();
    } catch {
    }
  }}
                  
                  variant="contained" sx={{color:red}} disabled={Loading}>
                    رفض
                  </Button>
      </DialogActions>
    </Dialog>
    {/* Snackbar نجاح */}
          <Snackbar
            open={Boolean(successMessage)}
            autoHideDuration={3000}
            onClose={() => setSuccessMessage("")}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" variant="filled">{successMessage}</Alert>
          </Snackbar>
    
          {/* Snackbar خطأ */}
          <Snackbar
            open={Boolean(errorMessage)}
            autoHideDuration={3000}
            onClose={() => setErrorMessage("")}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" variant="filled">{errorMessage}</Alert>
          </Snackbar>
          </>
  );
}
