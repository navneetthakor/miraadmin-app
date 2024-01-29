import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'

export default function Orders() {
    let tt = 0;

    // to use theme object 
    const theme = useTheme();
  return (
    <Box
    sx={{
        border: "2px solid red",
        background: theme.pallete.background.alt
    }}
    >
      
    </Box>
  )
}
