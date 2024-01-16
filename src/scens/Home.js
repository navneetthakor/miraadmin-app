import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background,
      }}
    >
      <Typography sx={{m: "20px"}} variant="h1">Hello guy's</Typography>
    </Box>
  );
}
