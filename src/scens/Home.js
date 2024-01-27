import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useOutletContext } from "react-router-dom";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

// array for cards in top
const cards = [
  {
    header: "Sales Today",
    amount: "$ 2.532",
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

// for line chart
const Sales = [35, 60, 20, 20, 35, 25, 20, 30, 32];
const Orders = [5, 9, 6, 3, 5, 3, 3, 6, 7];
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
];

// for table of piechart
const pietableRows = [
  {
    source: "Social",
    revenue: 260,
    value: 35,
  },
  {
    source: "Search Engines",
    revenue: 125,
    value: -12,
  },
  {
    source: "Direct",
    revenue: 54,
    value: 46,
  },
  {
    source: "Other",
    revenue: 146,
    value: 24,
  },
];

export default function Home(props) {
  let tt = 0;
  const theme = useTheme();
  const isNonMobile = useOutletContext();

  //  to put the cards
  const putCards = cards.map((iteam) => {
    tt += 500;
    return (
      <Grow in="true" timeout={tt}>
        <Card
          key={iteam.header}
          sx={{
            backgroundColor: `${
              iteam.tag === "none"
                ? "rgba(255, 255, 255, 0.5)"
                : theme.palette.background.alt
            }`,
            color: `${
              iteam.tag === "none" ? theme.palette.primary[500] : "inherite"
            }`,
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
                  backgroundColor: `${
                    iteam.profitLose < 0
                      ? "rgba(255,69,0,0.4)"
                      : "rgba(50, 205, 50,0.4)"
                  }`,
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
      </Grow>
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

      {/* line and pie chart  */}
      <Box
        sx={{
          margin: `${isNonMobile ? "5% 0%" : "10% 0%"}`,
          display: "flex",
          flexDirection: `${isNonMobile ? "row" : "column"}`,
          gap: "5%",
        }}
      >
        {/* linechart  */}
        
        <Grow in="true" timeout={tt += 500}>
          <Box
            sx={{
              width: `${isNonMobile ? "65%" : "100%"}`,
              height: 500,
              backgroundColor: theme.palette.background.alt,
              borderRadius: "5px",
            }}
          >
            <Typography variant="h4" sx={{ p: "10px 15px" }}>
              Total Revenue
            </Typography>
            <LineChart
              xAxis={[{ scaleType: "point", data: xLabels }]}
              series={[
                {
                  data: Sales,
                  label: "Sales",
                },
                {
                  data: Orders,
                  label: "Orders",
                },
              ]}
              height={455}
            />
          </Box>
        </Grow>

        {/* piechart  */}
        <Grow in="true" timeout={tt += 500}>
        <Box
          sx={{
            width: `${isNonMobile ? "30%" : "100%"}`,
            height: 500,
            backgroundColor: theme.palette.background.alt,
            borderRadius: "5px",
            marginTop: `${isNonMobile ? "inherite" : "5%"}`,
          }}
        >
          <Typography variant="h4" sx={{ p: "10px 15px" }}>
            Weekly Sales
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 260, label: "Social" },
                  { id: 1, value: 125, label: "Search Eng." },
                  { id: 2, value: 54, label: "Direct" },
                  { id: 3, value: 146, label: "Others" },
                ],
              },
            ]}
            height={150}
          />

          {/* table that used in piechart */}
          <Box margin="5% 5%">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pietableRows.map((iteam) => {
                    return (
                      <TableRow>
                        <TableCell>{iteam.source}</TableCell>
                        <TableCell align="right">{iteam.revenue}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: `${iteam.value > 0 ? "#32CD32" : "red"}`,
                          }}
                        >
                          {iteam.value}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Grow>
      </Box>
      {/* barChart and table  */}
      <Box
        sx={{
          height: "500px",
          width: "100%",
          marginBottom: "5%",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Typography variant="h4" sx={{ p: "10px 15px" }}>
          Mobile/Desktop
        </Typography>
        <BarChart
          height={455}
          series={[
            { data: Sales, label: "Mobile", id: "pvId", stack: "total" },
            { data: Orders, label: "Desktop", id: "uvId", stack: "total" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </Box>
    </Box>
  );
}
