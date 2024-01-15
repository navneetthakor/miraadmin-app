import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function RootLayout() {
  // to use theme
  const theme = useTheme();

  // for Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        width= "250px"
        setIsSidebarOpen= {setIsSidebarOpen}
      />
      <Box>
        <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen= {setIsSidebarOpen}
        />
        <Outlet/>
      </Box>
    </Box>
  );
}
