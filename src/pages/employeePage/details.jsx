import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  Divider,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { dark_green } from "../../colors/colorsApp";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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

export default function ComplaintDetails({ open, onClose, complaint }) {
    const [locked, setLocked] = useState(false); // false = مفتوح، true = مسكر

  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleImageOpen = (img) => {
    setSelectedImage(img);
    setOpenImage(true);
  };


  return (
    <>
      {/* Modal الرئيسي */}
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
           
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
             <IconButton onClick={() => setLocked(!locked)}>
      {locked ? (
        <LockIcon sx={{ fontSize: 30, color: dark_green }} /> // القفل مغلق
      ) : (
        <LockOpenIcon sx={{ fontSize: 30, color: dark_green }} /> // القفل مفتوح
      )}
    </IconButton>
            
          </Box>
 <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black", textAlign: "center" }}
            >
              {complaint.title}
            </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* تفاصيل */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: "black" }}>
                <strong>رقم الشكوى:</strong> {complaint.number}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>تاريخ التقديم:</strong> {complaint.date}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>مقدم الشكوى:</strong> {complaint.user}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: "black" }}>
                <strong>المدينة:</strong> {complaint.city}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>القسم:</strong> {complaint.department}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>التصنيف:</strong> {complaint.category}
              </Typography>
              <Typography sx={{ color: "black" }}>
                <strong>مسند إلى:</strong> {complaint.assignedTo}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* تفاصيل النص */}
          <Typography sx={{ mb: 2, color: "black" }}>
            <strong>تفاصيل الشكوى:</strong> {complaint.details}
          </Typography>

          {/* ملفات مرفقة */}
          <Typography sx={{ fontWeight: "bold", mb: 1, color: "black" }}>
            المرفقات ({complaint.attachments.length})
          </Typography>

          <Grid container spacing={1}>
            {complaint.attachments.map((file, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageOpen(file)}
                >
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {file.name}
                  </Typography>
                  <VisibilityIcon />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* أزرار الإدارة */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowNoteInput(!showNoteInput)}
            >
              إضافة ملاحظة
            </Button>
            <Button variant="outlined" color="secondary">
              طلب معلومات
            </Button>
            <Button
              variant="contained"
              color="success"
            //   onClick={() => handleChangeStatus("قبول")}
            >
              قبول
            </Button>
            <Button
              variant="contained"
              color="error"
            //   onClick={() => handleChangeStatus("رفض")}
            >
              رفض
            </Button>
          </Stack>

          {/* مدخل الملاحظة */}
          {showNoteInput && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="اكتب ملاحظة"
                variant="outlined"
                
              />
              <Button sx={{ mt: 1 }} variant="contained" >
                حفظ الملاحظة
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Modal عرض الصور فقط */}
      <Modal open={openImage} onClose={() => setOpenImage(false)}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              عرض المرفق
            </Typography>
            <IconButton onClick={() => setOpenImage(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedImage?.type === "image" ? (
            <img
              src={selectedImage.url}
              alt="attachment"
              style={{ width: "100%", borderRadius: 8 }}
            />
          ) : (
            <Typography sx={{ color: "black" }}>
              📄 لا يمكن عرض هذا النوع، يرجى تحميل الملف
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
