import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { incomingComplaints } from "../../slices/manegerAdmin/incomingcomplaints";
import ChangeStatusModal from "./ChangeStatusModal";
import AddNoteModal from "./AddNoteModal";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import ComplaintCard from "./ComplaintCard";

export default function Incoming_Complaints() {
  const dispatch = useDispatch();
  const { data, isloading, page } = useSelector((state) => state.incomingComplaints);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);

  useEffect(() => {
    dispatch(incomingComplaints(page)); 
  }, [dispatch]);

  const complaints = data?.data?.data || [];
  const meta = data?.data?.meta;
  const links = data?.data?.links;

  // --- Buttons Actions ----
  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenDetails(true);
  };

  const handleAddNote = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenAddNote(true);
  };

  const handleChangeStatus = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenChangeStatus(true);
  };

  const loadPage = (newPage) => {
    dispatch(incomingComplaints(newPage));
  };

  if (isloading)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        الشكاوي الواردة
      </Typography>

      {complaints.length === 0 ? (
        <Typography sx={{ mt: 4, textAlign: "center", color: "gray" }}>
          لا توجد شكاوي واردة حالياً.
        </Typography>
      ) : (
        complaints.map((item) => (
          <ComplaintCard
            key={item.id}
            complaint={item}
            onView={handleView}
            onAddNote={handleAddNote}
            onChangeStatus={handleChangeStatus}
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
        complaint={selectedComplaint}
        onClose={() => setOpenDetails(false)}
      />

      <AddNoteModal
        open={openAddNote}
        complaint={selectedComplaint}
        onClose={() => setOpenAddNote(false)}
        onSave={() => setOpenAddNote(false)}
      />

      <ChangeStatusModal
        open={openChangeStatus}
        complaint={selectedComplaint}
        onClose={() => setOpenChangeStatus(false)}
        onSave={() => setOpenChangeStatus(false)}
      />
    </Box>
  );
}
