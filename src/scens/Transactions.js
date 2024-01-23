import { useTheme } from "@emotion/react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import TransactionContext from "../context/TransactionContext";

export default function Transactions() {
  // to get theme Object
  const theme = useTheme();

  //  to get props provided to <outlet/>
  const isNonMobile = useOutletContext();

  // to get data from TransactionContext
  const {transactions, isTransactiosAvailable} = useContext(TransactionContext);

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
            backgroundColor: theme.palette.background.alt
         }}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
              {isTransactiosAvailable &&  
                <TableBody sx={{backgroundColor: theme.palette.background.default}}>
                  
                </TableBody>}
            </Table>
        </TableContainer>

      </Box>
    </Box>
  );
}
