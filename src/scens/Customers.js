import { useTheme } from "@emotion/react";
import {
  Box,
  Grow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import CustomerContext from "../context/CustomerContext";
import Header from "../components/Header";

export default function Customers() {
  let tt = 0;

  // to get theme Object
  const theme = useTheme();

  //  to get props provided to <outlet/>
  const isNonMobile = useOutletContext();

  // geting values form CustomerContext
  const { customers, isCustomersAvailable } = useContext(CustomerContext);
  console.log(customers);

  return (
    <Box
      sx={{
        padding: "5%",
      }}
    >
      {/* header of page  */}
      <Header primHeader="Customers" secHeader="List of Customers" />

      {/* table witch contains list of Customers  */}
      <Grow in="true" timeout={tt += 500}>
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
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              {isCustomersAvailable && (
                <TableBody
                  sx={{ backgroundColor: theme.palette.background.default }}
                >
                  {customers?.map((iteam) => {
                    return (
                      <TableRow key={iteam._id}>
                        <TableCell>{iteam._id}</TableCell>
                        <TableCell>{iteam.name}</TableCell>
                        <TableCell>{iteam.email}</TableCell>
                        <TableCell>{iteam.date.substring(0, 10)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Grow>
    </Box>
  );
}
