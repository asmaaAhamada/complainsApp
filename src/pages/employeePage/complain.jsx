

import {
  Grid,
  Card,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { dark_green, defult } from "../../colors/colorsApp";
import ComplaintDetails from "./details";
import { useEffect, useState } from "react";
import Search from "../hirareq/search";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../../slices/complaints/fetch";
import NoComplaints from "../emptyData/complaints";

const complaintData = {
  title: "تعطل إضاءة الشوارع",
  number: "C-2025",
  date: "١٤ جمادى الأولى ١٤٤٧ هـ في ٠٧:٤٥ م",
  user: "ريم الغامدي",
  city: "الرياض",
  department: "خدمات المواطنين",
  category: "المرافق العامة",
  assignedTo: "فاطمة العتيبي",
  details: "إضاءة الشوارع في حي السلام لا تعمل منذ أسبوعين...",
  attachments: []
};





export default function ComplaintsPage(){
    //state
  const complaintsState = useSelector((state) => state.fetchComplaints);
      const { data: complaints, isloading, error } = complaintsState;
console.log(complaints?.data?.data)
    const dispatch= useDispatch()


// fetchData
useEffect(()=>{
dispatch(fetchComplaints())
},[])

    const [openModal,setOpenModal]=useState(false)
      const theme = useTheme();
    
    return(
        <>
        <Search/>
         <Grid  container spacing={3}>
     {
     
     
     isloading?(

  <><h5 style={{color: dark_green}}>جار تحميل البيانات.........</h5></>
     ):
     error?(
        <Typography color="error">{error}</Typography>
     ):
     
     
     
     
     
     
     complaints?.data?.data && complaints?.data?.data.length > 0 ? (
          complaints?.data?.data.map((complaint) => (
        <Grid  sx={(theme) => ({
    backgroundColor: theme.palette.background.default
  })}              key={complaint.id}
 item xs={12} sm={6} md={3}>
          <Card sx={ {bgcolor: 'background.main',mt:3, height: "100%", display: "flex", flexDirection: "column" ,borderRadius:'8%',boxShadow:`4px 2px 3px ${dark_green}`}}>
           
            <Box
        sx={{
                       

            backgroundColor: theme.palette.background.default,
          flex: { xs: '1 1 100%', md: '1 1 45%' },
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          mt: { xs: 4, md: 0 },
        }}
      > 


</Box>
   
            <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ color: dark_green }}
                  >
                    {complaint.complaint_type}
                  </Typography>
               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    الرقم المرجعي: {complaint.reference_number}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    المستخدم: {complaint.user_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    تاريخ الإنشاء:                   {new Date(complaint.created_at).toLocaleDateString()}

                  </Typography>
            </CardContent>
            <CardActions>
              <Button
onClick={() => setOpenModal(true)}
fullWidth            
  variant="contained"
                sx={{backgroundColor:dark_green ,color:defult}}
              >
عرض التفاصيل              </Button>

            </CardActions>
          </Card>
        </Grid>
      )))
    
    :(
                  <NoComplaints/>

    )
    
    
    }
    </Grid>
    <ComplaintDetails
  open={openModal}
  onClose={() => setOpenModal(false)}
  complaint={complaintData}
/>
        </>
    )
}