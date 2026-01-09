
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
import { dark_green, defult } from "../../../colors/colorsApp";
import { useEffect, useState } from "react";
import Search from "../../hirareq/search";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../../../slices/complaints/fetch";
import ComplaintHistoryDetails from "./ComplaintHistoryDetails";
import NoComplaints from "../../emptyData/complaints";







 
export default function ComplaintsPage(){

  

  






 
 

    //state
  const complaintsState = useSelector((state) => state.fetchComplaints);
      const { data: complaints, isloading, error } = complaintsState;
console.log(complaints?.data?.data)
    const dispatch= useDispatch()

const [selectedId, setSelectedId] = useState(null);

// fetchData
useEffect(()=>{
dispatch(fetchComplaints())
},[])

    const [openModal,setOpenModal]=useState(false)
      const theme = useTheme();
    
    return(
        <>
       
         <Grid  container spacing={3}>
     {
     
     
     isloading?(

  <>
    
     <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress sx={{color:dark_green}} />
          </Box>
    </>
     ):
     error?(
        <Typography color="error">{error}</Typography>
     ):
     
     
     
     
     
     
     complaints?.data?.data && complaints?.data?.data.length > 0 ? (
          complaints?.data?.data.map((complaint) => (
        <Grid  sx={(theme) => ({
    backgroundColor: theme.palette.background.default,mb:3,
  })}              key={complaint.id}
 item xs={12} sm={6} md={3}>
          <Card sx={ {bgcolor: 'background.main',mt:3, height: "100%", display: "flex", boxShadow: 5 , flexDirection: "column" ,borderRadius:'8%',border:`solid ${dark_green} `
        ,transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 10,
                },
        
        }}>
           
            {/* <Box
        sx={{
                       

            backgroundColor: theme.palette.background.default,
          flex: { xs: '1 1 100%', md: '1 1 45%' },
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          mt: { xs: 4, md: 0 },
        }}
      > 


</Box> */}
   
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
تاريخ الإنشاء: {new Date(complaint.created_at).toLocaleDateString()}                  </Typography>
            </CardContent>
            <CardActions>
              <Button
onClick={() => {
    setSelectedId(complaint.id);
    setOpenModal(true);
  }}
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
   <ComplaintHistoryDetails
  open={openModal}
  onClose={() => setOpenModal(false)}
  complaintId={selectedId}
/>

        </>
    )
}