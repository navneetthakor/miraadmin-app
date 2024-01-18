import React from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useOutletContext } from "react-router-dom";

// array for cards in top
const cards = [
  {
    header: "Sales Today",
    amount: 2.532,
    profitLose: 26,
    tag: "today",
  },
  {
    header: "Visitors",
    amount: 170,
    profitLose: -14,
    tag: "Annual",
  },
  {
    header: "Total Earnings",
    amount: "$ 24.3",
    profitLose: 18,
    tag: "Monthly",
  },
  {
    header: "Pending Orders",
    amount: 45,
    profitLose: -9,
    tag: "none",
  },
];

export default function Home(props) {
  const theme = useTheme();
  const isNonMobile = useOutletContext();

  // function to put the cards
  const putCards =
    cards.map((iteam) => {
      return (
        <Card
          sx={{
            backgroundColor: `${iteam.tag === "none" ? "rgba(255, 255, 255, 0.5)" : theme.palette.background.alt}`,
            color: `${iteam.tag === "none" ? theme.palette.primary[500] : "inherite"}`,
          }}
        >
          <CardContent>
            <FlexBetween>
              <Typography variant="h4">{iteam.header}</Typography>
              {iteam.tag !== "none" && (
                <Typography
                  sx={{
                    backgroundColor: "#1E90FF",
                    padding: "0% 2%",
                    borderRadius: "5px",
                  }}
                >
                  {iteam.tag}
                </Typography>
              )}
            </FlexBetween>

            <Typography variant="h2" sx={{ m: "2% 0%" }}>
              {iteam.amount}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5%",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: `${iteam.profitLose < 0 ? "rgba(255,69,0,0.7)" : "green"}`,
                  padding: "0% 2%",
                  borderRadius: "5px",
                }}
              >
                {iteam.profitLose}%
              </Typography>
              <Typography>Since last month</Typography>
            </Box>
          </CardContent>
        </Card>
      );
    });



  // -------------- actual returning part ----------------
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background,
        flexDirection: `${isNonMobile ? "column" : "column"}`,
        paddingLeft: "7%",
        paddingRight: "7%",
      }}
    >
      {/* top header  */}
      <Box
        sx={{
          padding: "3% 0%",
        }}
      >
        <FlexBetween
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            padding: `${isNonMobile ? "2% 0%" : "7% 0%"}`,
          }}
        >
          <Box
            sx={{
              width: `${isNonMobile ? "inherite" : "100%"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: `${isNonMobile ? "left" : "center"}`,
            }}
          >
            <Typography variant="h1">Welcome Admin </Typography>
            <Typography>
              &nbsp; Your dashboard is ready for preview! &nbsp; &#128075;
            </Typography>
          </Box>

          <Box display={`${isNonMobile ? "block" : "none"}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </Box>
        </FlexBetween>
      </Box>

      {/* card of top view */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `${isNonMobile ? "repeat(4,1fr)" : "inherite"}`,
          gridTemplateRows: `${isNonMobile ? "inherite" : "repeat(4,1fr)"}`,
          gap: "2%",
        }}
      >
        {putCards}
      </Box>
    </Box>
  );
}
