import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function RootLayout() {
  // to use theme
  const theme = useTheme();

  // whether device is mobile or not 
  const isNonMobile = useMediaQuery("(min-width: 770px)")
  // for Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box display={isNonMobile ? "flex": "block"} width="100%" height="100%">
      <Sidebar 
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        width= "250px"
        setIsSidebarOpen= {setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen= {setIsSidebarOpen}
        />
        <Outlet/>
      </Box>
    </Box>
  );
}
