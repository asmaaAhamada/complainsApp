import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { incomingComplaints } from "../../slices/manegerAdmin/incomingcomplaints";
import AddNoteModal from "./AddNoteModal";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import ComplaintCard from "./ComplaintCard";
import { Toggle } from "../../slices/manegerAdmin/toglleStatus";
import { Snackbar, Alert } from "@mui/material";
import { dark_green } from "../../colors/colorsApp";
import Search from "../hirareq/search";

export default function Incoming_Complaints() {







          const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { data, isloading, page } = useSelector((state) => state.incomingComplaints);
console.log(data)
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
  const [selectedComplaint_id, setselectedComplaint_id] = useState(null);
  const [id, setid] = useState(null);
  const [iid, setiid] = useState(null);

  useEffect(() => {
    dispatch(incomingComplaints(page)); 
  }, [dispatch,page]);

 const complaints = data?.data?.data ;
const meta = data?.data?.meta || {};
const links = data?.data?.links || {};
// console.log("complaints:", complaints);
// console.log("meta:", meta);
// console.log("links:", links);
//search
const searchSlice = useSelector(state => state.SearchComplaints);
console.log("SLICE:", searchSlice);


// const { data: searchResults } = useSelector(
//     (state) => state.SearchComplaints
//   );




const hasSearch = searchTerm.trim() !== "";

const resultsToDisplay = hasSearch
  ? (Array.isArray(searchSlice?.data) ? searchSlice.data : [])
  : (complaints ?? []);
////.......serch......///////////
  // --- Buttons Actions ----
  const handleView = (id) => {
      setselectedComplaint_id(id);   

    setOpenDetails(true);
  };

  const handleAddNote = (id) => {
    setid(id);
    setOpenAddNote(true);
  };

  
  
const handleChangeStatus = (id) => {
  dispatch(Toggle(id)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      setSuccessMessage("تم تغيير حالة الشكوى بنجاح ✔");
      dispatch(incomingComplaints(page)); 
    }
  });
};


  const loadPage = (newPage) => {
    dispatch(incomingComplaints(newPage));
  };

  if (isloading)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress sx={{color:dark_green}} />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      
        <Snackbar
  open={Boolean(successMessage)}
  autoHideDuration={3000}
  onClose={() => setSuccessMessage("")}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert severity="success" variant="filled">
    {successMessage}
  </Alert>
</Snackbar>

       <Search onSearch={setSearchTerm}/>

{resultsToDisplay.length === 0 ? (
  <Typography sx={{ mt: 4, textAlign: "center", color: "gray" }}>
    لا توجد شكاوي.
  </Typography>
) : (
  resultsToDisplay.map((item) => (
    <ComplaintCard
      key={item.id}
      complaint={item}
      onView={() => handleView(item.id)}
      onAddNote={() => handleAddNote(item.id)}
      onChangeStatus={() => handleChangeStatus(item.id)}
    />
  ))
)}


      {/* Pagination */}
      {meta?.last_page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            disabled={!links?.prev}
            onClick={() => loadPage(meta.current_page - 1)}
            variant="outlined"
          >
            السابق
          </Button>

          <Typography sx={{ mt: 1 }}>
            الصفحة {meta.current_page} من {meta.last_page}
          </Typography>

          <Button
            disabled={!links?.next}
            onClick={() => loadPage(meta.current_page + 1)}
            variant="outlined"
          >
            التالي
          </Button>
        </Box>
      )}

      {/* Modals */}
      <ComplaintDetailsModal
        open={openDetails}
        complaintId={selectedComplaint_id}
        onClose={() => setOpenDetails(false)}
          onSuccess={() => dispatch(incomingComplaints(page))}   

      />

      <AddNoteModal
        open={openAddNote}
        id={id}
        onClose={() => setOpenAddNote(false)}
        onSave={() => setOpenAddNote(false)}
      />

      {/* <ChangeStatusModal
        open={openChangeStatus}
        id={iid}
        onClose={() => setOpenChangeStatus(false)}
        onSave={() => setOpenChangeStatus(false)}
      /> */}
    </Box>
  );
}
