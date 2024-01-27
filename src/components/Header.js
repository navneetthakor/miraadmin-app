import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function Header(props) {
    // to destructure props 
    const {primHeader, secHeader} = props;

    // to get theme object 
    const theme = useTheme();

    // to get whether device is mobile or non mobile 
    const isNonMobile = useOutletContext();
    
  return (
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
        <Typography variant="h1">{primHeader}</Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.secondary[300],
          }}
        >
          {secHeader}
        </Typography>
      </Box>
  )
}
