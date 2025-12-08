import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ComplaintDetailsModal({ open, complaint, onClose }) {
  if (!complaint) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>تفاصيل الشكوى</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" fontWeight="bold">
          العنوان:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {complaint.title || "لا يوجد عنوان"}
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold">
          الوصف:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {complaint.description || "لا يوجد وصف"}
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold">
          الحالة:
        </Typography>
        <Typography variant="body2">
          {complaint.status || "غير محددة"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="success">
          إغلاق
        </Button>
      </DialogActions>
    </Dialog>
  );
}
