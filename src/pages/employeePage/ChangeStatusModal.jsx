import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

export default function ChangeStatusModal({ open, complaint, onClose, onSave }) {
  const [status, setStatus] = useState(complaint?.status || "");

  const handleSave = () => {
    onSave(complaint, status);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>تعديل حالة الشكوى</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>الحالة</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="جديدة">جديدة</MenuItem>
            <MenuItem value="قيد المعالجة">قيد المعالجة</MenuItem>
            <MenuItem value="تم الحل">تم الحل</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          إغلاق
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
