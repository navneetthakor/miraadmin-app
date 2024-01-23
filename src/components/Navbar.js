import React from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  InputBase,
  IconButton,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined as SettingsIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween.js";

// to change the mode
import { useDispatch } from "react-redux";
import { setMode } from "../store/Mode.js";

export default function Navbar(props) {
  // destructuring props
  const { isSidebarOpen, setIsSidebarOpen, isNonMobile } = props;

  // taking theme object out
  const theme = useTheme();

  // preparing material for dispatch
  const dispatch = useDispatch();

  // actual object returning
  return (
    <AppBar
    position="sticky"
      sx={{
        background: theme.palette.background.default,
        position: "sticky",
        left:0,
        top: 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* left side part  */}
        <FlexBetween>
          {!isNonMobile && (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          )}
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

        {/* right side  */}
        <FlexBetween gap="10px">
          {theme.palette.mode === "dark" ? (
            <IconButton onClick={() => dispatch(setMode())}>
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(setMode())}>
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          )}

          <IconButton>
            <SettingsIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
