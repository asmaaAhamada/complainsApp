import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchComplaints } from "../../slices/search/complaints";
import { dark_green } from "../../colors/colorsApp";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({onSearch}){
const dispatch = useDispatch();
  const [search, setSearch] = useState("");  
return(
    <>
    
             <TextField  
            
         value={search}
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
if (value.trim() === "") {
  onSearch("");
  return;
}

          dispatch(SearchComplaints(value));
        
      }}
        sx={{
           "& .MuiInputLabel-root": {
      color: dark_green, // لون الليبل العادي
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: dark_green, // لون الليبل عند التركيز
    },
          color:'black',
          mb:3,
          width: '80%', // الوضع العادي
          '@media (max-width:900px)': {
            width: '50%', // شاشة متوسطة
          },
          '@media (max-width:600px)': {
            width: '35%', // موبايل
          }, 


          
    "& input": {
      color: "black",
     
    },
        }} id="outlined-basic" label="ادخل الرقم المرجعي للبحث هنا" variant="outlined" 
        
        
       InputProps={{
    startAdornment: (
      <IconButton> 
        <SearchIcon sx={{ color: "rgb(44, 44, 44)" }} />
      </IconButton>
    ),
  }} 
        
        />
             


    
    </>
)
}