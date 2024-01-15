import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  useTheme,
  InputBase,
  IconButton,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween.js";

export default function Navbar(props) {
  // destructuring props
  const { isSidebarOpen, setIsSidebarOpen } = props;

  // taking theme object out
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* left side part  */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
            <MenuIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween
            sx={{
              borderRadius: "9px",
              gap: "3rem",
              padding: "0.1rem 1.5rem",
              backgroundColor: `${theme.palette.background.alt}`,
            }}
          >
            <InputBase placeholder="serach..." />
            <IconButton>
              <SearchIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween> */}

        {/* right side  */}
        <FlexBetween>
          <IconButton>
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
