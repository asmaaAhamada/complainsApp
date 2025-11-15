

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useLocation } from 'react-router-dom';
//icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; 


import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { dark_green, defult } from '../../colors/colorsApp';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const drawerWidth = 240;

function SidPar(props) {

const pages = [
  { label: "لوحة التحكم", path: "/dashboard" },
  { label: "الشكاوي", path: "/complaints" },
];


const iconsMap = {
  'لوحة التحكم': <DashboardIcon  fontSize="large"  />,
  'الشكاوي': <PrivacyTipIcon   fontSize="large"  />,
};


const location = useLocation();

  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
   {pages.map(({ label, path }) => {
  const isActive = location.pathname === path;

  return (
    <ListItem key={label} disablePadding>
      <ListItemButton
        component={Link}
        to={path}
        sx={{
          backgroundColor: isActive ? "#ffffff" : "transparent",
          "&:hover": { backgroundColor: "#ffffff99" },
          borderRadius: "8px",
          mx: 1,
        }}
      >
        <ListItemIcon sx={{ color: isActive ? dark_green : "#fff" }}>
          {iconsMap[label]}
        </ListItemIcon>

        <ListItemText
          primary={label}
          sx={{
            "& .MuiTypography-root": {
              color: isActive ? dark_green : "#fff",
              fontWeight: isActive ? "bold" : "normal",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
})}


    </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' ,}}>
      <CssBaseline />
      {/*  زر فتح السايد بار على الموبايل */}
       <IconButton
       
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
                    sx={{ position: 'fixed', top: 50, left: 16, zIndex: 12000, display: { sm: "none" }, color: theme.palette.primary.main }}

        // sx={{ display: { sm: 'none' }, position: 'fixed', top: 80, left: 16, zIndex: 1200 }}
      >
        <MenuIcon sx={{color:dark_green}} />
      </IconButton>

      {/* ✅ Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,backgroundColor: dark_green},
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor: dark_green },
          }}
          open
        >
          {drawer}
        </Drawer>
          <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{
          width: 48,
          height: 48,
          "@media (max-width:900px)": {
            width: 40,
            height: 40,
          },
          "@media (max-width:600px)": {
            width: 32,
            height: 32,
          },
        }}/>
      </Box>

      {/* ✅ المحتوى الرئيسي */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />

      </Box>
    </Box>
  );
}

SidPar.propTypes = {
  window: PropTypes.func,
};

export default SidPar;
