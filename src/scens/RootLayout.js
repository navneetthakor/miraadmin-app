import React from 'react'
import {
    Box,
    useTheme
} from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    const theme = useTheme();
  return (
    <Box sx={{
        backgroundColor: theme.palette.background
    }}>
      <Outlet/>
    </Box>
  )
}
