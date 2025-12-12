import React, { useEffect } from "react";
import { VictoryPie } from "victory";
import { Box, Typography } from "@mui/material";
import { COLORS, dark_green, secondaryColors } from "../../colors/colorsApp";
import { useDispatch, useSelector } from "react-redux";
import { Statistics } from "../../slices/victory/adminSatics";


import Diversity3Icon from '@mui/icons-material/Diversity3';
import Groups2Icon from '@mui/icons-material/Groups2';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ApartmentIcon from "@mui/icons-material/Apartment";
import BlockIcon from '@mui/icons-material/Block';

import ScheduleIcon from "@mui/icons-material/Schedule";

import HistoryIcon from "@mui/icons-material/History";
export default function DashboardCharts() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Statistics);

  useEffect(() => {
    dispatch(Statistics());
  }, [dispatch]);

  // بيانات الشكاوى
  const complaintStats = data
    ? [
        { x: "قيد المعالجة", y: data.complaints_processing ,icon:<ScheduleIcon/> },
        { x: "منتهية", y: data.complaints_completed ,icon:<AutoAwesomeIcon/>},
        { x: "مرفوضة", y: data.complaints_rejected ,icon:<BlockIcon/> },
        { x: "قيد الانتظار", y: data.complaints_pending  ,icon:<HistoryIcon/>},
      ]
    : [];

  // بيانات المستخدمين والموظفين والجهات الحكومية
  const userStats = data
    ? [
        { x: "المستخدمين", y: data.total_users ,icon:<Groups2Icon/> },
        { x: "الموظفين", y: data.total_employees,icon:<Diversity3Icon/> },
        { x: "الجهات الحكومية", y: data.total_government_entities ,icon:<ApartmentIcon/> },
      ]
    : [];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* رسم بياني للشكاوى */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
         : توزيع الشكاوى حسب الحالة
        </Typography>

        {complaintStats.length > 0 ? (
          <>
            {/* Pie Chart بدون نصوص داخلية */}
            <VictoryPie
              data={complaintStats}
              colorScale={COLORS}
              labels={() => null}
              innerRadius={60}
              padAngle={3}
              height={300}
            />

            {/* Cards أسفل الرسم */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
                gap: 2,
                mt: 3,
                width: "100%",
              }}
            >
              {complaintStats.map((item, index) => (
                <Box
                  key={item.x}
                  sx={{
                    bgcolor: COLORS[index],
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: 3,
                  }}
                >
                  <Box sx={{display:'flex',justifyContent:'center',gap:2}}
                  >
                 
                  <Typography>{item.x}</Typography>
                   {item.icon}
                  </Box>
                  <Typography variant="h6">{item.y}</Typography>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 5, color: "gray" }}>
            لا توجد بيانات متاحة حالياً
          </Typography>
        )}
      </Box>

      {/* رسم بياني للمستخدمين */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
         : توزيع المستخدمين والموظفين والجهات الحكومية
        </Typography>

        {userStats.length > 0 ? (
          <>
            {/* Pie Chart بدون نصوص داخلية */}
            <VictoryPie
              data={userStats}
              colorScale={secondaryColors || COLORS}
              labels={() => null}
              innerRadius={60}
              padAngle={3}
              height={300}
            />

            {/* Cards أسفل الرسم */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
                gap: 2,
                mt: 3,
                width: "100%",
              }}
            >
              {userStats.map((item, index) => (
                <Box
                  key={item.x}
                  sx={{
                    bgcolor: secondaryColors ? secondaryColors[index] : COLORS[index],
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "black",
                    fontWeight: "bold",
                    boxShadow: 3,
                  }}
                >
 <Box sx={{display:'flex',justifyContent:'center',gap:2}}
                  >
                 
                  <Typography>{item.x}</Typography>
                   {item.icon}
                  </Box>                  <Typography variant="h6">{item.y}</Typography>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 5, color: "gray" }}>
            لا توجد بيانات متاحة حالياً
          </Typography>
        )}
      </Box>
    </Box>
  );
}
