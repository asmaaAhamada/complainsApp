import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deletGonverments } from "../../../slices/gonvernment/deletGonverments";
import { dark_green } from "../../../colors/colorsApp";






export default function DeleteGonverments({ open, onClose ,onSuccess,id}) {
const {error}=useSelector((state)=>state.deletGonverments)
const [showSuccess, setShowSuccess] = useState(false);

console.log(error)
const dispatsh=useDispatch()


function handleDelete(id){
    dispatsh(deletGonverments(id))
      .unwrap()  // لو تريد التعامل مع النتيجة مباشرة
      .then(() => {
          if (typeof onSuccess === "function") onSuccess();
              setShowSuccess(true);

          if (typeof onClose === "function") onClose();

           setTimeout(() => {
                setShowSuccess(false); //  إخفاء الرسالة بعد ثانيتين
                dispatch(resetForm()); //  تصفير القيم بعد العرض
                onClose(); //  إغلاق المودال بعد عرض الرسالة
              }, 2000);
      })
      .catch((err) => {
          console.error(err);
      });
}


  

  
     
  return (
    <>
    {showSuccess  &&(
     <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: 'green',
                color: "white",
                padding: "24px 36px",
                borderRadius: "10px",
                fontSize: "22px",
                fontWeight: "bold",
                textAlign: "center",
                zIndex: 2000,
                boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                minWidth: "300px",
              }}
            >
            تمت العملية بنجاح
            </Box>)} 
      {error && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "red",
            color: "white",
            padding: "24px 36px",
            borderRadius: "10px",
            fontSize: "22px",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: 2000,
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
            minWidth: "300px",
          }}
        >
          {error}
        </Box>
      )}

      <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ direction: "rtl", fontSize: "24px", fontWeight: "700",color:dark_green }}
          >
            {"هل ترغب حقا بحذف الجهة"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ fontSize: "24px", fontWeight: "700" }}
              id="alert-dialog-description"
            >
              لن تستطبع التراجع اذا قمت بالضغط على موافق
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mr: 39 }}>
            <Button
              sx={{ color: "red", fontSize: "24px", fontWeight: "700" }}
              autoFocus
              onClick={() => handleDelete(id)}
            >
            
موافق              
            </Button>
            <Button
              onClick={onClose}
               
              sx={{
                color: "rgb(14,74,35)",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              تراجع
            </Button>
          </DialogActions>
        </Dialog>

         

    </>
  );
}
