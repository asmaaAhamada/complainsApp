import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Chip, Box, Button, CircularProgress, Grid, Card, CardContent, Typography } from "@mui/material";
import { dark_green, defult } from "../../../colors/colorsApp";
import Search from "../../hirareq/search";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../emptyData/no data";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchGonverment } from "../../../slices/gonvernment/fetchgonverment";
import ADD_Gonvermentss from "./addGonverment";
import DeleteGonverments from "./deletGonverments";
import Edit_Gonvermentss from "./editGonverments";


export default function Gonvernment() {

const { data,isLoading, error } = useSelector((state) => state.fetchGonverment);
console.log(data)
const dispatch=useDispatch()

//fetch employees
React.useEffect(()=>{
  dispatch(fetchGonverment())
},[])
  const [openADD,setopenADD]=React.useState(false)
  const [openEdit,setopenEdit]=React.useState(false)
  const[openDelet,setopenDelete]=React.useState(false)
  //store employees
const [selectedid, setSelectedid] = React.useState(null);


//id
const [id, setid] = React.useState(null);

function handleadd(){
  setopenADD(true)
}

  function handleEdit(item){
  setopenEdit(true)
  setSelectedid(item);
}

 function handleDelete(id){
  setopenDelete(true)
  setid(id);
}
  return (
    <>
    <Box sx={{display:'flex' ,justifyContent:'Space_between' ,mb:2}}>
   
     <Button
     onClick={handleadd}
  variant="contained"
  
  sx={{
    borderRadius: "10px",
    fontSize: { xs: "18px", sm: "20px", md: "24px" },
    fontWeight: "700",
    mt: { xs: "5%", sm: "15%", md: "5%" },
    width: { xs: "30%", sm: "20%", md: "40%" },
    mb: 2,backgroundColor:dark_green,color:defult,
    textTransform: "none",
  }}
>
    اضافة جهة
</Button>
</Box>

   <Grid container spacing={2}>
  {error ? (
    <Box>{error}</Box>
  ) : isLoading ? (
     <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
  ) : Array.isArray(data) && data.length === 0 && !isLoading? (
    <NoData />
  ) : (
    data?.data.map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <Card
          sx={{
             color: dark_green,
            borderRadius: "16px",
            boxShadow: 3,
            transition: "0.3s",
            "&:hover": { transform: "scale(1.03)" },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
            >
              {item.name}
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton
                sx={{ color: dark_green }}
                onClick={() => handleEdit(item)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    ))
  )}
</Grid>




    <ADD_Gonvermentss
     open={openADD}
  onClose={() => setopenADD(false)}
              onSuccess={() => dispatch(fetchGonverment())}

    
    />

    <Edit_Gonvermentss
     open={openEdit}
      onClose={() =>setopenEdit(false)}
          onSuccess={() => dispatch(fetchGonverment())}
item={selectedid}
    />



    <DeleteGonverments
    open={openDelet}
     onClose={() =>setopenDelete(false)}
          onSuccess={() => dispatch(fetchGonverment())}
id={id}
    
    
    />
    </>
  );
}
