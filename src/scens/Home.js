import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useOutletContext } from "react-router-dom";

export default function Home(props) {
  const theme = useTheme();
  const isNonMobile = useOutletContext();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background,
        flexDirection: `${isNonMobile ? "column" : "column"}`,
        paddingLeft: "7%",
      }}
    >
      {/* top header  */}
      <Box
        sx={{
          padding: "3% 7% 2% 0%",
        }}
        >
        <FlexBetween
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          paddingBottom: `${isNonMobile ? "2%" : "5%"}`
        }}
        >
          <Box
            sx={{
              width: `${isNonMobile ? "inherite" : "100%"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: `${isNonMobile ? "left" : "center"}`
            }}
          >
            <Typography variant="h1">Welcome Admin</Typography>
            <Typography>&nbsp; Your dashboard is ready for preview!</Typography>
          </Box>

          <Box display={`${isNonMobile ? "block" : "none"}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </Box>
        </FlexBetween>
      </Box>

      {/* card of top view */}
    </Box>
  );
}
