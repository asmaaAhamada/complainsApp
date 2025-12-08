import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Employees_Statistics } from "../../slices/victory/employeesSatics";
import { COLORS, dark_green } from "../../colors/colorsApp";

export default function PanelGrid() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Employees_Statistics);

  useEffect(() => {
    dispatch(Employees_Statistics());
  }, [dispatch]);

  const complaintStats = data
    ? [
        { x: "قيد المعالجة", y: data.complaints_processing },
        { x: "منتهية", y: data.complaints_completed },
        { x: "مرفوضة", y: data.complaints_rejected },
        { x: "قيد الانتظار", y: data.complaints_pending },
      ]
    : [];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: dark_green,
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        توزيع الشكاوى حسب الحالة
      </Typography>

      {complaintStats.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
            gap: 2,
            justifyItems: "center",
          }}
        >
          {complaintStats.map((item, index) => (
            <Box
              key={item.x}
              sx={{
                width: 180,
                height: 120,
                bgcolor: COLORS[index],
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                boxShadow: 3,
              }}
            >
              <Typography>{item.x}</Typography>
              <Typography variant="h5">{item.y}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", mt: 4, color: "gray" }}
        >
          لا توجد بيانات متاحة حالياً
        </Typography>
      )}
    </Box>
  );
}
