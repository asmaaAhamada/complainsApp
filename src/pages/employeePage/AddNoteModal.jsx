import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function AddNoteModal({ open, complaint, onClose, onSave }) {
  const [note, setNote] = useState("");

  const handleSave = () => {
    onSave(complaint, note);
    setNote("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>إضافة ملاحظة</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="الملاحظة"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
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
