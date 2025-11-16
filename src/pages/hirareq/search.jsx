import { Avatar, Box, TextField } from "@mui/material";

export default function Search(){
return(
    <>
    
             <TextField  sx={{
          width: '80%', // الوضع العادي
          '@media (max-width:900px)': {
            width: '50%', // شاشة متوسطة
          },
          '@media (max-width:600px)': {
            width: '35%', // موبايل
          }, 
        }} id="outlined-basic" label="ابحث هنا" variant="outlined" />
             


    
    </>
)
}