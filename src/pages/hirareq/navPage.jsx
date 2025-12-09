
import { AppBar, Toolbar, Typography, Box, Button, IconButton, useTheme, colors } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Link } from "react-router-dom";
import { dark_green, defult, white_primary } from "../../colors/colorsApp";
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Log_outModal from "../logout";
import { useState } from "react";
export default function NavPage() {
    const[ShowEdit,setShowEdit]= useState(false)

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{     zIndex: (theme) => theme.zIndex.drawer + 1, //  هذا يخلي الناف فوق السايدبار
 bgcolor: dark_green, boxShadow: `1px 1px 1px ${white_primary}`}} position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" sx={{ mr: 2, color: theme.palette.primary.main }}>
          <ShieldOutlinedIcon fontSize="large" />

          </IconButton>

          <Typography variant="h6" sx={{ color: theme.palette.text.primary, flexGrow: 1 }}>
نظام الشكاوي الحكومي          </Typography>


        <Button onClick={()=>{setShowEdit(true)}}>
          تسجيل الخروج
          <LogoutIcon fontSize="large" />
        </Button>
<NotificationsIcon fontSize="large" sx={{color:defult}}/>
         
        </Toolbar>
      </AppBar>
       {<Log_outModal open={ShowEdit}
  onClose={() => setShowEdit(false)}/>}
    </Box>
    
  );
}
