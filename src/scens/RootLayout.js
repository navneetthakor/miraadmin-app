import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductContext from "../context/ProductContext";
import CustomerContext from "../context/CustomerContext";
import TransactionContext from "../context/TransactionContext";
import { useTheme } from "@emotion/react";
import { Update } from "@mui/icons-material";
import UpdateProductContext from "../context/UpdateProductContext";

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
    const url = `${process.env.REACT_APP_MY_IP}/customer/getallcustomers`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1ZGY3MjJjOGNjNjdhMTQ0N2IzOWJmNiJ9LCJpYXQiOjE3MTEzODk1MzZ9.QMKH6pujGQ3g5B_vC5VKxr9TM7SAJY1kzbeZPuAUakc"
      },
    });
    const data = await response.json();
    if (data) {
      setCustomers(data);
      setIsCustomersAvailable(true);
    }
  };

  // ---------------------------For Product.js-----------------------
  // to save the Products fetched from backend
  const [prods, setProds] = useState([]);
  // to check whether product fetching is completed or not
  const [isProdsAvilable, setIsProdsAvilable] = useState(false);

  // function to fetched the products
  const fetchProds = async () => {
    const url = `${process.env.REACT_APP_MY_IP}/product/fetchallprods`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      // data.reverse();
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
  const fetchTransactions = async () => {
    const url = `${process.env.REACT_APP_MY_IP}/payment/fetchAllPayment`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1ZGY3MjJjOGNjNjdhMTQ0N2IzOWJmNiJ9LCJpYXQiOjE3MTEzODk1MzZ9.QMKH6pujGQ3g5B_vC5VKxr9TM7SAJY1kzbeZPuAUakc"
      },
    });
    const data = await response.json();
    if (data.signal === 'green') {
      console.log(data.payments);
      setTransaction(data.payments);
      setIsTransactionsAVailable(true);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProds();
    fetchTransactions();
  }, []);

  // ---------------------------------for UpdateProduct.js ------------------------------------
  // to store single product which user wants to Update
  const [updateProd, setUpdateProd] = useState(null);

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
        <ProductContext.Provider value={{ prods, isProdsAvilable, setProds, fetchProds }}>
          <UpdateProductContext.Provider value={{ updateProd, setUpdateProd }}>
            <CustomerContext.Provider value={{ customers, isCustomersAvailable }}>
              <TransactionContext.Provider value={{ transactions, isTransactionsAvailable }}>
                <Outlet context={isNonMobile} />
              </TransactionContext.Provider>
            </CustomerContext.Provider>
          </UpdateProductContext.Provider>
        </ProductContext.Provider>
      </Box>
    </Box>
  );
}
