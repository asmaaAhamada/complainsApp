import React from "react";
import { VictoryPie, VictoryLegend } from "victory";
import { Box, Typography } from "@mui/material";
import { COLORS, dark_green } from "../../colors/colorsApp";
import { useSelector } from "react-redux";

// بيانات الشكاوى حسب الحالة
const complaintStats = [
  { x: "قيد المعالجة", y: 12 },
  { x: "منتهية", y: 25 },
  { x: "مرفوضة", y: 5 },
  { x: "مؤجلة", y: 3 },
];

// ألوان لكل حالة

export default function ComplaintsPieChart() {
//     const { userInfo } = useSelector((state) => state.user);

// console.log(userInfo?.name);
// console.log(userInfo?.role);
  return (
    <Box sx={{ width: "100%", height: 400, bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: dark_green, mb: 2, fontWeight: "bold", textAlign: "center" }}>
        توزيع الشكاوى حسب الحالة
      </Typography>

      <VictoryPie
        data={complaintStats}
        colorScale={COLORS}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        innerRadius={50}
        padAngle={3}
        style={{
          labels: { fontSize: 14, fill: "#000", fontWeight: "bold" },
        }}
      />

      <VictoryLegend
        x={50}
        y={10}
        orientation="horizontal"
        gutter={20}
        data={complaintStats.map((item, index) => ({
          name: item.x,
          symbol: { fill: COLORS[index] },
        }))}
      />
    </Box>
  );
}
