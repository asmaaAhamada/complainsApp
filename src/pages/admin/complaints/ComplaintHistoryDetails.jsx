import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  dark_green,
  white,
  white_primary,
  defult,
} from "../../../colors/colorsApp";

import CloseIcon from "@mui/icons-material/Close";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/Category";
import PlaceIcon from "@mui/icons-material/Place";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HistoryIcon from "@mui/icons-material/History";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchComplaints_History } from "../../../slices/complaints/history";

export default function ComplaintHistoryDetails({ open, onClose, complaintId }) {
  const dispatch = useDispatch();

  const { data, isloading, error } = useSelector(
    (state) => state.fetchComplaintsHistory
  );

  useEffect(() => {
    if (open && complaintId) {
      dispatch(fetchComplaints_History(complaintId));
    }
  }, [dispatch, complaintId, open]);

  if (isloading) return <CircularProgress sx={{ m: 5, color: dark_green }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  const complaint = data?.data;
  if (!complaint) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          backgroundColor: dark_green,
          color: defult,
        }}
      >
        تفاصيل الشكوى
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", left: 16, top: 16, color: defult }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: white_primary }}>
        <Box sx={{ p: 1 }}>
          {/* البيانات العامة */}
          <Card sx={{ mb: 4, backgroundColor: white }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: dark_green }}
              >
                🧾 البيانات العامة
              </Typography>

              <Divider sx={{ mb: 2, backgroundColor: dark_green }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ConfirmationNumberIcon fontSize="small" /> الرقم المرجعي: {complaint.reference_number}
                  </Typography>

                  <Typography color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccountBoxIcon fontSize="small" /> المستخدم: {complaint.user_name}
                  </Typography>

                  <Typography color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ApartmentIcon fontSize="small" /> الجهة: {complaint.government_entity}
                  </Typography>

                  <Typography color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CategoryIcon fontSize="small" /> التصنيف: {complaint.complaint_type}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PlaceIcon fontSize="small" /> الموقع: {complaint.location_description}
                  </Typography>

                  <Typography color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ScheduleIcon fontSize="small" /> التاريخ: {new Date(complaint.created_at).toLocaleDateString()}
                  </Typography>

                  <Chip
                    label={complaint.status}
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      backgroundColor:
                        complaint.status === "مغلقة" ? "#FF4C4C" : dark_green,
                      color: defult,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2, backgroundColor: dark_green }} />
                  <Typography fontWeight="bold" color={dark_green} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DescriptionIcon fontSize="small" /> وصف المشكلة:
                  </Typography>
                  <Typography color="black">{complaint.problem_description}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* المرفقات */}
          <Card sx={{ mb: 4, backgroundColor: white }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: dark_green, display: "flex", alignItems: "center", gap: 1 }}>
                <AttachFileIcon fontSize="small" /> المرفقات
              </Typography>

              <Divider sx={{ mb: 2, backgroundColor: dark_green }} />

              {complaint.attachments?.length > 0 ? (
                <Stack spacing={1}>
                  {complaint.attachments.map((file, index) => (
                    <Typography key={index} color="black" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AttachFileIcon fontSize="small" /> {file}
                    </Typography>
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary">لا يوجد مرفقات</Typography>
              )}
            </CardContent>
          </Card>

          {/* سجل التتبع */}
          <Card sx={{ backgroundColor: white }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: dark_green, display: "flex", alignItems: "center", gap: 1 }}>
                <HistoryIcon fontSize="small" /> سجل تتبع الشكوى
              </Typography>

              <Divider sx={{ mb: 2, backgroundColor: dark_green }} />

              {complaint.history?.length > 0 ? (
                <Stack spacing={2}>
                  {complaint.history.map((item, index) => (
                    <Card
                      key={index}
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderLeft: `6px solid ${dark_green}`,
                        backgroundColor: white_primary,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            backgroundColor: dark_green,
                            color: defult,
                          }}
                        >
                          {item.user?.charAt(0)}
                        </Avatar>

                        <Box>
                          <Typography fontWeight="bold" sx={{ color: dark_green }}>
                            الحالة: {item.status}
                          </Typography>

                          <Typography variant="body2" color="black">
                            بواسطة: {item.user}
                          </Typography>

                          <Typography variant="caption" sx={{ color: "gray" }}>
                            {new Date(item.date).toLocaleDateString()} 
                          </Typography>

                          <Typography variant="body2" mt={1} color="black">
                            📝 {item.note}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary">لا يوجد سجل تتبع لهذه الشكوى</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
