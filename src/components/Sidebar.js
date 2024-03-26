import React, { useState } from "react";
import profileImg from "../assets/profile.jpg";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Avatar,
  DialogTitle,
  Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 

// importing mui components
import { Box, Drawer } from "@mui/material";
import FlexBetween from "./FlexBetween";
import {
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
} from "@mui/icons-material";

// creating list
const sidebarIteam = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transaction",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "BreakDown",
    icon: <PieChartOutlined />,
  }
];

export default function Sidebar(props) {
  let tt = 0;
  // destructuring the provided props
  const { isSidebarOpen, OuterDrawerWidth, setIsSidebarOpen, isNonMobile } =
    props;

  // taking them Object out
  const theme = useTheme();

  // to determine the active tab
  const [active, setActive] = useState("Dashboard");

  // for navigation 
  const navigate = useNavigate();

  return (
    <Box component="nav"
    sx={{
      height: "100%"
    }}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          variant="persistent"
          anchor="left"
          sx={{
            width: OuterDrawerWidth,
            border: "2px solid red",
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: 0,
              width: OuterDrawerWidth,
            },
          }}
        >
          {/* main container  */}
          <Box width="100%" height="100%">
            {/* header of Sidebar  */}
            <Box
            sx={{
              position: "sticky",
              top:0,
              left:0,
              background: theme.palette.background.alt,
              zIndex:10,
              overflow: "hidden"
            }}
            >
              <FlexBetween
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <Typography variant="h1">Mira</Typography> */}
                <DialogTitle
                  variant="h1"
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  Eco
                </DialogTitle>

                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ fontSize: "25px" }} />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            {/* Iteams to be displayed  */}
            <Box sx={{height: "77%"}}>
              <List>
                {sidebarIteam.map((iteam) => {
                  if (!iteam.icon) {
                    return (
                      <Typography
                        sx={{ padding: "2% 0% 1% 7%" }}
                        key={iteam.text}
                      >
                        {iteam.text}
                      </Typography>
                    );
                  }

                  return (
                    <Grow in="true" timeout={tt += 500}>
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          setActive(iteam.text);
                          navigate(`/${iteam.text}`);
                        }}
                        sx={{
                          padding: "1% 0% 1% 10%",
                          backgroundColor:
                            active === iteam.text
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === iteam.text
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              active === iteam.text
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {iteam.icon}
                        </ListItemIcon>
                        <ListItemText primary={iteam.text} />
                      </ListItemButton>

                      {active === iteam.text && <ChevronRightOutlined />}
                    </ListItem>
                    </Grow>
                  );
                })}
              </List>
            </Box>

            <Box
              sx={{
                background: theme.palette.background.alt,
                display: "flex",
                gap: 1,
                p: 1.5,
                pb: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                position: "sticky",
                bottom:0,
                left:0
              }}
            >
              <Avatar size="lg" src={profileImg} />
              <div>
                <Typography variant="h4">Username</Typography>
                <Typography level="body-sm">joined 20 Jun 2023</Typography>
              </div>
            </Box>
          </Box>
        </Drawer>
      )}
      
    </Box>
  );
}
