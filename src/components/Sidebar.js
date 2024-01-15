import React from 'react'
import {
  useTheme
} from '@mui/material';

// importing mui components 
import { 
    Box,
    Drawer
} from '@mui/material'

export default function Sidebar(props) {
    // destructuring the provided props 
    const {isSidebarOpen, width, setIsSidebarOpen} = props;

    // taking them Object out 
    const theme = useTheme();

    
  return (
    <Box
    component='nav'
    >
    {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: width,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: 0,
              width: width,
            },
          }}
        >
        nk the boss
      </Drawer>
    )}
    </Box>
  )
}
