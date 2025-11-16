
import { CircularProgress, Box } from '@mui/material';
import { dark_green } from '../colors/colorsApp';

export default function APPLoading(){
    return(
        <>
  <Box
      sx={{
        backgroundColor: '#ffffff',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        sx={{
          color:dark_green,
        }}
        size={60}
        thickness={5}
      />
    </Box>   </> )
}