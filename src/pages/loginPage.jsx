//=======mui=======//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { InputAdornment, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { dark_green } from "../colors/colorsApp";


export default function Log__in_Page() {
  
const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 

     
  return (
    <>
      

      <Box sx={{ 
        display: "flex", 
        height: "100vh", 
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" }
      }}>
        {/* قسم الصورة - سيخفي على الهواتف */}
        <Box
          sx={{
            flex: { xs: 0, md: 3 },
            display: { xs: "none", md: "block" }
          }}
        >
          <img 
            src="../../public/image/4.jpg" 
            style={{ 
              width: "100%", 
              height: "100%",
              objectFit: "cover"
            }} 
            alt="خلفية تسجيل الدخول"
          />
        </Box>
        
       

        {/* قسم الكارد */}
        <Card
          sx={{
            width: { 
              xs: "100%", 
              sm: "70%", 
              md: "40%", 
              lg: "23%" 
            },
            height: { xs: "100%", md: "100%" },
            px: { xs: 2, sm: 3, md: 3 },
            pt: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 2, sm: 3, md: 4 },
            backgroundColor: dark_green,
            boxShadow: { 
              xs: "none", 
              md: "-10px 0px 30px rgb(70, 80, 72)" 
            },
            borderRadius: { xs: 0, md: "initial" },
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", md: "flex-start" },
            margin: { xs: "0 auto", md: "0" }
          }}
        >
          <form style={{ width: "100%" }}>
            <CardContent sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              width: "100%"
            }}>
             
              
              

              <Typography
                variant="h3"
                sx={{ 
                  mt: isMobile ? 3 : 5, 
                  mb: isMobile ? 8 : 14, 
                //   color: (theme) => theme.palette.secondary.main,
                  textAlign: "center"
                }}
              >
شكواكم مسؤوليتنا              </Typography>

              <Box sx={{ 
                width: "100%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center" 
              }}>
               
   <TextField
          id="outlined-password-input"
          label="اسم المستخدم"
         
          autoComplete="current-password"
                            type= "text" 

          sx={{
                    width: "80%",
                    borderRadius: "10px",
                    mb: 1,
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                     
                      boxShadow: "4px 3px 4px rgba(233, 223, 223, 0.3)",
                      paddingRight: "8px",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                        boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                      },
                    },
                  }}
                   
        />

       <TextField
          id="outlined-password-input"
          label="كلمة المرور"
         
          autoComplete="current-password"
                            type={showPassword ? "text" : "password"}

          sx={{
                    width: "80%",
                    borderRadius: "10px",
                    mb: 1,
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "white",
                     
                      boxShadow: "4px 3px 4px rgba(233, 223, 223, 0.3)",
                      paddingRight: "8px",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                        boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                      },
                    },
                  }}
                   InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          size="small"
                          sx={{
                            padding: "4px",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                
        />

              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                //   backgroundColor: (theme) => theme.palette.secondary.main,
                //   color: (theme) => theme.palette.primary.main,
                  fontSize: { xs: "18px", sm: "20px", md: "24px" },
                  fontWeight: "700",
                  mt: { xs: "5%", sm: "15%", md: "5%" },
                  width: { xs: "50%", sm: "40%", md: "80%" },
                  mb: 2,
                  textTransform: "none",
                }}
              >
                تسجيل الدخول
              </Button>
            </CardContent>
          </form>
        </Card>
      </Box>
    </>
  );
}