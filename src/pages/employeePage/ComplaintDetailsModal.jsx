import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  Grid
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

import { fetchComplaintsincoming } from "../../slices/manegerAdmin/details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dark_green } from "../../colors/colorsApp";

export default function ComplaintDetailsModal({ open, onClose, complaintId }) {
  const dispatch = useDispatch();

  const { data, isloading, error } = useSelector(
    (state) => state.fetchComplaintsincoming
  );

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: dark_green, fontWeight: "bold" }}>
        تفاصيل الشكوى
      </DialogTitle>

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
            {infoItem(<ScheduleOutlined />, "تاريخ الإنشاء:", complaint.created_at)}
            {infoItem(<UpdateOutlined />, "تاريخ التعديل:", complaint.updated_at)}
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
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: dark_green,
            color: "white",
            "&:hover": { backgroundColor: "#0b5f3a" }
          }}
        >
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
}
