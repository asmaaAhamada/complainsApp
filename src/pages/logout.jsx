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
import { useNavigate } from "react-router-dom";
import { dark_green } from "../colors/colorsApp";






export default function Log_outModal({ open, onClose ,onSuccess}) {

const navigate = useNavigate();


 function handleLogout(){
   

      onClose(); // إغلاق المودال
      navigate("/login", { replace: true }); // التوجيه لصفحة تسجيل الدخول
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
            sx={{color:dark_green, direction: "rtl", fontSize: "24px", fontWeight: "700" }}
          >
            {"هل ترغب حقا بتسجيل الخروج؟"}
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
               onClick={handleLogout}
            >
              {/* {load ? <CircularProgress/>:"موافق"} */}
              df
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
