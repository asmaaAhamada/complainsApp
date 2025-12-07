import {
  TableCell,
  TableRow,Typography,Box
  
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

export default function NoData(){
    return(
        <>
        <TableRow>
  <TableCell colSpan={8} align="center">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        color: 'gray'
      }}
    >
      <InboxIcon sx={{ fontSize: 80, mb: 1, color: 'lightgray' }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        لا توجد بيانات حالياً
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        لا يوجد محتوى لعرضه في الوقت الحالي
      </Typography>
    </Box>
  </TableCell>
</TableRow>

        
        
        
        </>
    )
}