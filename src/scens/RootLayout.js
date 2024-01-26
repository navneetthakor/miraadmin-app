import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductContext from "../context/ProductContext";
import CustomerContext from "../context/CustomerContext";
import TransactionContext from "../context/TransactionContext";
import { useTheme } from "@emotion/react";

export default function RootLayout() {
  //to get theme object
  const theme = useTheme();
  // whether device is mobile or not
  const isNonMobile = useMediaQuery("(min-width: 960px)");

  // for Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // -------------------------- for Customers.js ----------------------
  // to store customers
  const [customers, setCustomers] = useState([]);
  // to indicate whether fetching customers operation completed or not
  const [isCustomersAvailable, setIsCustomersAvailable] = useState(false);
  // to fetch customers from backend
  const fetchCustomers = async () => {
    const url = `${process.env.REACT_APP_MY_IP}/users/getallcustomers`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1ODVkODQ5YTUzZTMxNDlmOTU3ZTQ4NCJ9LCJpYXQiOjE3MDU4MzYzODJ9.bu03gBUwo0CEUwO1Om9MTVPk5SG0eh9QmdESQ14n-Hw",
      },
    });
    const data = await response.json();
    setCustomers(data);
    if (data) setIsCustomersAvailable(true);
  };

  // ---------------------------For Product.js-----------------------
  // to save the Products fetched from backend
  const [prods, setProds] = useState([]);
  // to check whether product fetching is completed or not
  const [isProdsAvilable, setIsProdsAvilable] = useState(false);

  // function to fetched the products
  const fetchProds = async () => {
    const url = `${process.env.REACT_APP_MY_IP}/storeproducts/fetchallprods`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      data.reverse();
      setProds(data);
      setIsProdsAvilable(true);
    }
  };

  // ----------------------------------for Transactions.js ---------------------------------------
  // to store customers
  const [transactions, setTransaction] = useState([]);
  // to indicate whether fetching customers operation completed or not
  const [isTransactionsAvailable, setIsTransactionsAVailable] = useState(false);
  // to fetch customers from backend
  const fetchTransactions = async () => {};

  useEffect(() => {
    fetchCustomers();
    fetchProds();
  },[theme]);

  // --------------------------------------actual returning value -------------------------------------
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        OuterDrawerWidth="250px"
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <ProductContext.Provider value={{ prods, isProdsAvilable, fetchProds }}>
          <CustomerContext.Provider value={{ customers, isCustomersAvailable }}>
            <TransactionContext.Provider value={{transactions, isTransactionsAvailable}}>
              <Outlet context={isNonMobile} />
            </TransactionContext.Provider>
          </CustomerContext.Provider>
        </ProductContext.Provider>
      </Box>
    </Box>
  );
}
