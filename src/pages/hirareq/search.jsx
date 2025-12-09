import { TextField } from "@mui/material";
import { useState } from "react";

export default function Search({onSearch}){
    const [search, setsearch] = useState("");
  
return(
    <>
    
             <TextField  
             value={search}
      onChange={(e) => {
        setsearch(e.target.value);
        onSearch(e.target.value); 
      }}
        sx={{
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