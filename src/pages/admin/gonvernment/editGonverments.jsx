import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dark_green } from "../../../colors/colorsApp";
import { Edit_Gonverments, resetForm, setformInfo } from "../../../slices/gonvernment/Edit_Gonverments";

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

export default function Edit_Gonvermentss({ open, onClose ,onSuccess,item }) {
  const { name,} = useSelector((state) => state.Edit_Gonverments.formInfo);
const { isLoading, error,success } = useSelector((state) => state.Edit_Gonverments);
const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();



useEffect(() => {
  if (item) {
    dispatch(setformInfo({
      name: item.name || "",
      
    }));

  }
}, [item, dispatch]);





useEffect(() => {
  if (success) {
    setShowSuccess(true);
     if (typeof onSuccess === "function") onSuccess();

   setTimeout(() => {
      setShowSuccess(false); //  إخفاء الرسالة بعد ثانيتين
      dispatch(resetForm()); //  تصفير القيم بعد العرض
      onClose(); //  إغلاق المودال بعد عرض الرسالة
    }, 2000);
  }
}, [success, dispatch, onClose]);



 function handlAdd_Gonverments() {
  
  dispatch(Edit_Gonverments(item.id));
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
        تم التعديل  بنجاح
        </Box>)} 
        
        
         {error && (
  <Box
    sx={{
      position: "fixed",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      bgcolor: "error.main",
      color: "#fff",
      p: 2,
      borderRadius: 2,
      zIndex: 1300, 
      boxShadow: 3,
    }}
  >
    {error}
  </Box>
)} 



    <Modal open={open} onClose={onClose}>
    
      <Box sx={style}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{color:dark_green}} variant="h6">تعديل جهة حكومية</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="الاسم"
              name="name"
            value={name}
           onChange={(e) => dispatch(setformInfo({ name: e.target.value }))}
                      sx={{ input: { color: "black" }}}

            />
          </Grid>

        
        </Grid>

        {/* زر الإضافة */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: dark_green ,width:'100%'}}
            onClick={()=>handlAdd_Gonverments(item.id)}
          >
            {isLoading? <CircularProgress/> :"حفظ"}
            
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
}
