

import {
  Grid,
  Card,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { dark_green, defult } from "../../colors/colorsApp";
import ComplaintDetails from "./details";
import { useState } from "react";
import Search from "../hirareq/search";

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


const products = [
  {
    id: 1,
    name: "Lip balm",
    description: " Hydrating lip balm that keeps your lips soft and smooth all day.",
    price: "120 $",
   
  },
  {
    id: 2,
    name: "Eyeshadow",
    description: "Silky eyeshadow with rich pigment for stunning eye looks",
    price: "250 $",
   
  },
  {
    id: 3,
    name: "Lip gloss",
    description: "Shiny lip gloss that adds a glossy, plump finish to your lips",
    price: "180 $",
    
  },
  {
    id: 4,
    name: "Mascara",
    description: "Volumizing mascara that lifts and defines every lash",
    price: "320 $",
    
  },
];


export default function ComplaintsPage(){
    const [openModal,setOpenModal]=useState(false)
      const theme = useTheme();
    
    return(
        <>
        <Search/>
         <Grid  container spacing={3}>
      {products.map((product) => (
        <Grid  sx={(theme) => ({
    backgroundColor: theme.palette.background.default
  })}key={product.id} item xs={12} sm={6} md={3}>
          <Card sx={{bgcolor: 'background.main', height: "100%", display: "flex", flexDirection: "column" ,borderRadius:'8%',boxShadow:`4px 2px 3px ${dark_green}`}}>
           
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
              <Typography  gutterBottom variant="h6" component="div" sx={{color:dark_green}}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {product.price}
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
      ))}
    </Grid>
    <ComplaintDetails
  open={openModal}
  onClose={() => setOpenModal(false)}
  complaint={complaintData}
/>
        </>
    )
}