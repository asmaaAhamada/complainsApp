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
import { deletEmployees } from "../../../slices/employees/delet";
import { dark_green } from "../../../colors/colorsApp";






export default function DeleteEmployees({ open, onClose ,onSuccess,id}) {
const {error}=useSelector((state)=>state.deletEmployees)
console.log(error)
const dispatsh=useDispatch()
// useEffect(()=>{
// if(id)
//     alert(id)
// },[])

function handleDelete(id){
    dispatsh(deletEmployees(id))
      .unwrap()  // لو تريد التعامل مع النتيجة مباشرة
      .then(() => {
          if (typeof onSuccess === "function") onSuccess();
          if (typeof onClose === "function") onClose();
      })
      .catch((err) => {
          console.error(err);
      });
}


  

  
     
  return (
    <>
      {/* {error && (
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
      )} */}

      <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ direction: "rtl", fontSize: "24px", fontWeight: "700" ,color:dark_green}}
          >
            {"هل ترغب حقا بحذف الموظف"}
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
