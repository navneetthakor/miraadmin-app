import { useTheme } from "@emotion/react";
import {
  Box,
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
import { useNavigate, useOutletContext } from "react-router-dom";
import TransactionContext from "../context/TransactionContext";
import FlexRow from "../components/FlexRow";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Transactions() {
  // to get theme Object
  const theme = useTheme();

  //  to get props provided to <outlet/>
  const isNonMobile = useOutletContext();

  // to get data from TransactionContext
  const { transactions, isTransactionsAvailable } =
    useContext(TransactionContext);

  // to update payment (mark as completed)
  const navigate = useNavigate();
  const handlePaymentUpdate = async(index,status) => {
    const url = `${process.env.REACT_APP_MY_IP}/payment/updatePayment`;
    const response = await fetch(url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({payment_id: transactions[index]._id, status: "Refunded"})
    })
    const result = await response.json();

    if(result.signal === 'red'){
      alert('Some error occured');
      return;
    }
    transactions[index].status = 'Refunded';
    navigate('/transaction')
  }

  return (
    <Box
      sx={{
        padding: "5%",
      }}
    >
      {/* header of page  */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          paddingBottom: "20px",
          display: `${isNonMobile ? "inherite" : "flex"}`,
          flexDirection: `${isNonMobile ? "inherite" : "column"}`,
          justifyContent: `${isNonMobile ? "inherite" : "center"}`,
          alignItems: `${isNonMobile ? "inherite" : "center"}`,
        }}
      >
        <Typography variant="h1">Transactions</Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.secondary[300],
          }}
        >
          List of Transactions
        </Typography>
      </Box>

      {/* table witch contains list of Customers  */}
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Country</Typography></TableCell>
                <TableCell><Typography variant="h6">Amount (INR)</Typography></TableCell>
                <TableCell><Typography variant="h6">Method</Typography></TableCell>
                <TableCell><Typography variant="h6">Status</Typography></TableCell>
                <TableCell><Typography variant="h6">Date</Typography></TableCell>
                <TableCell><Typography variant="h6">Update</Typography></TableCell>
              </TableRow>
            </TableHead>
            {isTransactionsAvailable && (
              <TableBody
                sx={{ backgroundColor: theme.palette.background.default}}
              >
                {transactions?.map((iteam,index) => {
                  if(iteam.method === 'stripe' && iteam.status === 'Pending') iteam.status = 'Cancelled' //only for old transaction as now logic is implemented to deal with this problem
                  return (
                    <TableRow key={iteam._id}>
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
                          {iteam.country}
                        </FlexRow>
                      </TableCell>
                      <TableCell>{iteam.amount}</TableCell>
                      <TableCell>
                      {iteam.method.toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <FlexRow
                          sx={{
                            height: "30px",
                            width: "100px",
                            borderRadius: '50px',
                            justifyContent: 'center',
                            background:
                              iteam.status === "Pending"
                                ? "#387ADF"
                                : iteam.status === "Cancelled"
                                ? "red"
                                : iteam.status === 'Reverse'
                                ? "yellow"
                                : iteam.status === 'Refunded'
                                ? "gray"
                                : iteam.status === "Send-Back"
                                ? "darkblue"
                                : "green",
                          }}
                        >
                          {iteam.status}
                        </FlexRow>
                      </TableCell>
                      <TableCell>{iteam.date.substring(0, 10)}</TableCell>
                      <TableCell> {iteam.status === 'Send-Back' && <CheckCircleOutlineIcon sx={{cursor: 'pointer'}} onClick={() => handlePaymentUpdate(index)}/>}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
