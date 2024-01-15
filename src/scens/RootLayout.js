import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function RootLayout() {
  // to use theme
  const theme = useTheme();

  // for Sidebar
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar 
        isOpen={isOpen}
        width= "250px"
        setIsSidebarOpen= {setIsOpen}
      />
      <Box>
        <Navbar
        isSidebarOpen={isOpen}
        setIsSidebarOpen= {setIsOpen}
        />
        <Outlet/>
      </Box>
    </Box>
  );
}
