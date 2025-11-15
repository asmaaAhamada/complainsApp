import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { dark_green } from "../../colors/colorsApp";


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
const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


const handleImageOpen = (img) => {
    setSelectedImage(img);
    setOpenImage(true);
  };

return(
    <>
    
     {/* Modal الرئيسي */}
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color:dark_green , textAlign: "center" 
 }}>
              {complaint.title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* تفاصيل */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{color:'black'}}><strong>رقم الشكوى:</strong> {complaint.number}</Typography>
              <Typography><strong>تاريخ التقديم:</strong> {complaint.date}</Typography>
              <Typography><strong>مقدم الشكوى:</strong> {complaint.user}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography><strong>المدينة:</strong> {complaint.city}</Typography>
              <Typography><strong>القسم:</strong> {complaint.department}</Typography>
              <Typography><strong>التصنيف:</strong> {complaint.category}</Typography>
              <Typography><strong>مسند إلى:</strong> {complaint.assignedTo}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* تفاصيل النص */}
          <Typography sx={{ mb: 2 }}>
            <strong>تفاصيل الشكوى:</strong> {complaint.details}
          </Typography>

          {/* ملفات مرفقة */}
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
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
                  <Typography variant="body2">{file.name}</Typography>
                  <VisibilityIcon />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>

      {/* Modal عرض الصور فقط */}
      <Modal open={openImage} onClose={() => setOpenImage(false)}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">عرض المرفق</Typography>
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
            <Typography>📄 لا يمكن عرض هذا النوع، يرجى تحميل الملف</Typography>
          )}
        </Box>
      </Modal>
    
    
    
    </>
)

}