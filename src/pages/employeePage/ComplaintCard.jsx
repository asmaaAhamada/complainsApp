import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";
import { dark_green, dark_red, Orang, white, white_primary, Yallow } from "../../colors/colorsApp";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function ComplaintCard({ complaint, onView, onAddNote, onChangeStatus }) {
  return (
    <Card
      sx={{
        backgroundColor: white_primary,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: `2px solid ${dark_green}22`,
        p: 2,
        mb: 2,
      }}
    >
      <CardContent>
       <Typography variant="h6" fontWeight="bold" color={dark_green}>
  {complaint.complaint_type || "نوع الشكوى غير موجود"}
</Typography>

<Typography color={dark_green} variant="body2" sx={{ mt: 1 }}>
  رقم المرجع: {complaint.reference_number}
</Typography>

<Typography color={dark_green} variant="body2" sx={{ mt: 1 }}>
  مقدم الشكوى: {complaint.user_name}
</Typography>
<Typography  color={dark_green} variant="body2" sx={{ mt: 1 }}>
التاريخ: {new Date(complaint.created_at).toLocaleDateString()}</Typography>

        <Box sx={{ mt: 2 }}>
          <Chip
            label={`الحالة: ${complaint.status || "غير محددة"}`}
            sx={{
              backgroundColor: complaint.status==='مرفوضة'? dark_red : complaint.status==='منجزة' ? dark_green :
              complaint.status==='قيد المعالجة' ? Orang:
              
              Yallow,
              color: white,
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* الأزرار */}
        <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => onView(complaint)}
            sx={{
              backgroundColor: dark_green,
              "&:hover": { backgroundColor: "#2d5f3a" },
              flex: 1,
            }}
          >
            عرض التفاصيل
          </Button>

          <Button
            variant="outlined"
            onClick={() => onAddNote(complaint)}
            sx={{
              borderColor: dark_green,
              color: dark_green,
              "&:hover": { borderColor: "#2d5f3a", color: "#2d5f3a" },
              flex: 1,
            }}
          >
            إضافة ملاحظة
          </Button>

          <Tooltip title="تغيير الحالة إلى قيد المعالجة">
  <IconButton 
    color="red" 
    onClick={() => onChangeStatus(complaint.id)}
  >
    <VisibilityIcon />
  </IconButton>
</Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}
