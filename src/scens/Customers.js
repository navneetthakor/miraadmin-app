import { useTheme } from "@emotion/react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useContext} from "react";
import { useOutletContext } from "react-router-dom";
import CustomerContext from "../context/CustomerContext";

export default function Customers() {
  // to get theme Object
  const theme = useTheme();

  //  to get props provided to <outlet/>
  const isNonMobile = useOutletContext();

  // geting values form CustomerContext 
  const {customers, isCustomersAvailable} = useContext(CustomerContext);

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
        <Typography variant="h1">Customers</Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.secondary[300],
          }}
        >
          List of Customers
        </Typography>
      </Box>

      {/* table witch contains list of Customers  */}
      <Box>
        <TableContainer
        component={Paper}
         sx={{
            backgroundColor: theme.palette.background.alt
         }}
         
         >
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
              {isCustomersAvailable &&  
                <TableBody sx={{backgroundColor: theme.palette.background.default}}>
                  {customers.map((iteam)=>{
                   return(  <TableRow key={iteam._id}>
                      <TableCell>{iteam._id}</TableCell>
                      <TableCell>{iteam.name}</TableCell>
                      <TableCell>{iteam.email}</TableCell>
                      <TableCell>{iteam.date.substring(0,10)}</TableCell>
                    </TableRow>)
                  })}
                </TableBody>}
            </Table>
        </TableContainer>

      </Box>
    </Box>
  );
}
