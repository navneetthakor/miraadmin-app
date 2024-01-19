import React from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import { Add, KeyboardArrowDownOutlined } from "@mui/icons-material";

export default function Products() {
  const isNonMobile = useOutletContext();
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background,
        flexDirection: `${isNonMobile ? "column" : "column"}`,
        padding: "5% 7%",
        height: "500px",
      }}
    >
      {/* header of Products page  */}
      <Box
      sx={{
        paddingBottom: `${isNonMobile ? "3%" : "7%"}`,
        borderBottom: "1px solid",
        borderColor: "divider"
      }}
      >
        <FlexBetween>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.background.alt,
            }}
            endIcon={<KeyboardArrowDownOutlined />}
          >
            Options
          </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.background.alt,

              }}
              endIcon={<Add/>}
            >
              Add Products
            </Button>
        </FlexBetween>
      </Box>
    </Box>
  );
}
