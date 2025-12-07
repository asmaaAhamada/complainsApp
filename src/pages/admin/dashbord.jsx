import React, { useEffect } from "react";
import { VictoryPie, VictoryLegend } from "victory";
import { Box, Typography } from "@mui/material";
import { COLORS, dark_green, secondaryColors } from "../../colors/colorsApp";
import { useDispatch, useSelector } from "react-redux";
import { Statistics } from "../../slices/victory/adminSatics";

export default function DashboardCharts() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.Statistics);

  useEffect(() => {
    dispatch(Statistics());
  }, [dispatch]);

  // بيانات الشكاوى
  const complaintStats = data
    ? [
        { x: "قيد المعالجة", y: data.complaints_processing },
        { x: "منتهية", y: data.complaints_completed },
        { x: "مرفوضة", y: data.complaints_rejected },
        { x: "قيد الانتظار", y: data.complaints_pending },
      ]
    : [];

  // بيانات المستخدمين والموظفين والجهات الحكومية
  const userStats = data
    ? [
        { x: "المستخدمين", y: data.total_users },
        { x: "الموظفين", y: data.total_employees },
        { x: "الجهات الحكومية", y: data.total_government_entities },
      ]
    : [];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* رسم بياني للشكاوى */}
      <Box
        sx={{
          width: "100%",
          height: 500,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: dark_green,
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          توزيع الشكاوى حسب الحالة
        </Typography>

        {complaintStats.length > 0 ? (
          <>
            <VictoryPie
              data={complaintStats}
              colorScale={COLORS}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              innerRadius={60}
              padAngle={3}
              labelRadius={90}
              style={{
                labels: {
                  fontSize: 14,
                  fontWeight: "bold",
                  fill: ({ datum }) => COLORS[complaintStats.indexOf(datum)],
                },
              }}
            />
            <VictoryLegend
              standalone={false}
              x={0}
              y={400}
              orientation="horizontal"
              gutter={20}
              data={complaintStats.map((item, index) => ({
                name: item.x,
                symbol: { fill: COLORS[index] },
              }))}
            />
          </>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 5 }}>
            جاري تحميل البيانات...
          </Typography>
        )}
      </Box>

      {/* رسم بياني للمستخدمين */}
      <Box
        sx={{
          width: "100%",
          height: 500,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: dark_green,
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          توزيع المستخدمين والموظفين والجهات الحكومية
        </Typography>

        {userStats.length > 0 ? (
          <>
            <VictoryPie
              data={userStats}
              colorScale={secondaryColors || COLORS}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              innerRadius={60}
              padAngle={3}
              labelRadius={90}
              style={{
                labels: {
                  fontSize: 14,
                  fontWeight: "bold",
                  fill: ({ datum }) =>
                    secondaryColors
                      ? secondaryColors[userStats.indexOf(datum)]
                      : COLORS[userStats.indexOf(datum)],
                },
              }}
            />
            <VictoryLegend
              standalone={false}
              x={0}
              y={400}
              orientation="horizontal"
              gutter={20}
              data={userStats.map((item, index) => ({
                name: item.x,
                symbol: {
                  fill: secondaryColors ? secondaryColors[index] : COLORS[index],
                },
              }))}
            />
          </>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 5 }}>
            جاري تحميل البيانات...
          </Typography>
        )}
      </Box>
    </Box>
  );
}
