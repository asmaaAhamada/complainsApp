import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify, setformInfo } from "../../slices/manegerAdmin/notify";
import { dark_green } from "../../colors/colorsApp";

export default function AddNoteModal({ open, id, onClose, onSave }) {
  const dispatch = useDispatch();
  const { formInfo, isLoading, error } = useSelector((state) => state.notify);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    dispatch(notify(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setSuccessMessage("تمت إضافة الملاحظة بنجاح ✔");
        onClose(); // إغلاق المودال تلقائياً
        dispatch(setformInfo({ note: "" })); // إعادة ضبط الحقل
        if (onSave) onSave(); // تحديث الـ parent إذا موجود
      } else if (res.meta.requestStatus === "rejected") {
        setErrorMessage(res.payload || "حدث خطأ أثناء إضافة الملاحظة ❌");
      }
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{color:dark_green}}>إضافة ملاحظة</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="الملاحظة"
            value={formInfo.note}
            onChange={(e) => dispatch(setformInfo({ note: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:dark_green}} onClick={onClose} variant="outlined">
            إغلاق
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{color:dark_green}} disabled={isLoading}>
            حفظ
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
