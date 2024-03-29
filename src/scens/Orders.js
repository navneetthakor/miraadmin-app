import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Grow,
  Icon,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import FlexBetween from "../components/FlexBetween";
import { AddTask, FactCheck, FactCheckOutlined } from "@mui/icons-material";
import Header from "../components/Header";
import OrderContext from "../context/OrderContext";
import FlexRow from "../components/FlexRow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CancelIcon from "@mui/icons-material/Cancel";
import ReverseIcon from '@mui/icons-material/FlipCameraAndroid';
import TransactionContext from "../context/TransactionContext";

// preparing card
const cards = [
  {
    icon: <AddTask sx={{ width: "27px", height: "27px" }} />,
    iconColor: "blue",
    name: "Orders Completed",
    number: "2,345",
  },
  {
    icon: <FactCheckOutlined sx={{ width: "27px", height: "27px" }} />,
    iconColor: "#08a187",
    name: "Orders Confirmed",
    number: "323",
  },
  {
    icon: <FactCheck sx={{ width: "27px", height: "27px" }} />,
    iconColor: "orangered",
    name: "Orders Cancelled",
    number: "18",
  },
  {
    icon: <FactCheckOutlined sx={{ width: "27px", height: "27px" }} />,
    iconColor: "lightgray",
    name: "Orders Refunded",
    number: "7",
  },
];

export default function Orders() {
  let tt = 0;

  // to use theme object
  const theme = useTheme();

  // getting orders array
  const { orders, isOrdersAvailable } = useContext(OrderContext);
  const {transactions} = useContext(TransactionContext);

  // to update payment (mark as completed)
  const navigate = useNavigate();
  const handlePaymentUpdate = async (index, status) => {
    const url = `${process.env.REACT_APP_MY_IP}/order/updateOrder`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1ZGY3MjJjOGNjNjdhMTQ0N2IzOWJmNiJ9LCJpYXQiOjE3MTEzODk1MzZ9.QMKH6pujGQ3g5B_vC5VKxr9TM7SAJY1kzbeZPuAUakc",
      },
      body: JSON.stringify({ order_id: orders[index]._id, payment_id: orders[index].payment_id, status: status }),
    });
    const result = await response.json();

    if (result.signal === "red") {
      alert("Some error occured");
      return;
    }
    orders[index].status = status;

    for(let i=0; i<transactions.length; i++){
      if(transactions[i].order_id === orders[index]._id){
        if(status === 'Cancelled') {
          if(transactions[i].status === 'Completed') transactions[i].status = 'Send-Back';
          else transactions[i].status = 'Cancelled'
        }
        else if(status === 'Returned'){
          transactions[i].status = 'Refunded';
        }
        else {
          transactions[i].status = status;
        }
      }
    }
    navigate("/Overview");

  };

  // to put cards
  const putCards = cards.map((iteam) => {
    tt += 500;
    return (
      <Grow in="true" timeout={tt}>
        <Card
          key={iteam.header}
          sx={{
            height: "150px",
            width: "200px",
            backgroundColor: theme.palette.primary[800],
            boxShadow: `1px 1px 10px ${theme.palette.background.alt} `,
            ":hover": {
              boxShadow: `1px 1px 3px 3px ${theme.palette.background.alt} `,
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginLeft: "10px",
            }}
          >
            <Box
              component={Icon}
              sx={{
                background: `${iteam.iconColor}`,
                color: "black",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              {iteam.icon}
            </Box>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {iteam.name}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {iteam.number}
            </Typography>
          </CardContent>
        </Card>
      </Grow>
    );
  });
  return (
    <Box
      sx={{
        padding: "40px 20px",
      }}
    >
      {/* header */}
      <Header primHeader="Orders" secHeader="List of Orders" />

      {/* cards container */}
      <Box
        sx={{
          paddingTop: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <Box
          gap="10px"
          sx={{
            height: "150px",
            width: "400px",
            backgroundColor: theme.palette.primary[800],
            boxShadow: `1px 1px 10px ${theme.palette.background.alt} `,
            ":hover": {
              boxShadow: `1px 1px 3px 3px ${theme.palette.background.alt} `,
            },
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ marginBottom: "10px" }}
          >
            Average Rate (%)
          </Typography>

          <Box sx={{ marginBottom: "10px" }}>
            <FlexBetween>
              <Typography fontWeight="bold">Product Views</Typography>
              <Typography fontWeight="bold">92%</Typography>
            </FlexBetween>
            <LinearProgress
              sx={{ borderRadius: "8px", height: "15px" }}
              variant="determinate"
              value={92}
            />
          </Box>

          <Box>
            <FlexBetween>
              <Typography fontWeight="bold">Card Abdondonment Rate</Typography>
              <Typography fontWeight="bold">12%</Typography>
            </FlexBetween>
            <LinearProgress
              sx={{ borderRadius: "8px", height: "15px" }}
              variant="determinate"
              value={12}
            />
          </Box>
        </Box>

        {/* cards  */}
        {putCards}
      </Box>

      {/* list of Orders  */}
      <Box
      sx={{
        marginTop: "5%",
      }}
      >
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Table>
            <TableHead
            >
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Country</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Mobile</Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography variant="h6">Update</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{ backgroundColor: theme.palette.background.default }}
            >
              {isOrdersAvailable &&
                orders?.map((order, index) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <FlexRow>
                          <img
                            style={{
                              height: "33px",
                              width: "50px",
                              marginRight: "20px",
                            }}
                            src="https://countryflagsapi.netlify.app/flag/IN.svg"
                            alt=""
                          />
                          {order.address.country}
                        </FlexRow>
                      </TableCell>
                      <TableCell>
                        {order.address.first_name} {order.address.last_name}
                      </TableCell>
                      <TableCell>{order.mobile}</TableCell>
                      <TableCell>
                        <FlexRow
                          sx={{
                            height: "30px",
                            width: "100px",
                            borderRadius: "50px",
                            justifyContent: "center",
                            background:
                            order.status === "Confirm"
                            ? "#387ADF"
                            : order.status === "Cancelled"
                            ? "red"
                            : order.status === 'Reverse'
                            ? "yellow"
                            : order.status === 'Returned'
                            ? "gray"
                            : "green",
                          }}
                        >
                          {order.status}
                        </FlexRow>
                      </TableCell>
                      <TableCell>
                        <FlexRow sx={{gap: '10px'}}>
                         {order.status === 'Confirm' && <CheckCircleOutlineIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePaymentUpdate(index, "Completed")
                            }
                          />}
                          {order.status === 'Confirm' && <CancelIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() =>
                                handlePaymentUpdate(index, "Cancelled")
                              }
                            />}
                          {order.status === 'Completed' &&  <ReverseIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              handlePaymentUpdate(index, "Reverse")
                            }
                            />}
                            {order.status === 'Reverse' &&  <CurrencyExchangeIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() =>
                                handlePaymentUpdate(index, "Returned")
                              }
                            />}
                        </FlexRow>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
