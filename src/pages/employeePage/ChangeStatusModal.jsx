import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { Toggle } from "../../slices/manegerAdmin/toglleStatus";
import { useDispatch, useSelector } from "react-redux";

export default function ChangeStatusModal({ open, id, onClose, onSave }) {
const dispatch = useDispatch();

  const { note, isloading, error } = useSelector(
    (state) => state.Toggle
  );

  const handleSave = () => {
    dispatch((Toggle(id)))
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
        <Button onClick={()=>handleSave(id)} variant="contained" color="primary">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
