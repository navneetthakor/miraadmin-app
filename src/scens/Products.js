import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import { Add, KeyboardArrowDownOutlined } from "@mui/icons-material";

export default function Products() {
  // to get props provided to outlet component in rootLayout
  const isNonMobile = useOutletContext();

  // to get theme, that we setted earlier
  const theme = useTheme();

  // to save the Products fetched from backend
  const [prods, setProds] = useState([]);

  // to check whether product fetching is completed or not
  const [isProdsAvilable, setIsProdsAvilable] = useState(false);

  // function to fetched the products
  const fetchProds = async () => {
    const url = `http://localhost:5000/storeproducts/fetchallprods`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.reverse();
    if (data) {
      setProds(data);
      setIsProdsAvilable(true);
    }
  };

  // to call fetchProds 
  useEffect(()=>{
    fetchProds();
  })

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
          borderColor: "divider",
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
            endIcon={<Add />}
          >
            Add Products
          </Button>
        </FlexBetween>
      </Box>

      {/* products section  */}
      {isProdsAvilable && (
        <Grid
          container
          direction={`${isNonMobile ? "column" : "inherite"}`}
          sx={{ paddingTop: "10px", alignItems: "center" }}
          columns={`${isNonMobile ? 1 : 2}`}
          gap="5%"
        >
          {prods.map((iteam) => {
            return (
              <Grid
                iteam
                sx={{
                  padding: `${ isNonMobile ? "10px 0px 10px 10px" : "inherite"}`,
                  height: `${isNonMobile ? "90px" : "200px"}`,
                  width: `${isNonMobile ? "80%" : "47.5%"}`,
                  backgroundColor: theme.palette.background.alt,
                  marginBottom: `${isNonMobile ? "3%" : "5%"}`,
                  display: "flex",
                  flexDirection: `${isNonMobile ? "row" : "column"}`,
                  alignItems: `${isNonMobile ? "inherite" : "center"}`,
                  justifyContent: `${isNonMobile ? "inherite" : "center"}`,
                  gap: `${isNonMobile ? "inherite" : "5%"}`,
                }}
              >
                {/* image  */}
                <Box
                  component="img"
                  sx={{
                    height: "70px",
                    width: "70px",
                    border: "1px solid lightgray",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                  src={`http://localhost:5000/${iteam.images[0]}`.replace(
                    /\\/g,
                    "/"
                  )}
                  alt=""
                />

                {/* other description  */}
                <Box
                  sx={{
                    marginLeft: `${isNonMobile ? "5%" : "inherite"}`,
                    display: "flex",
                    flexDirection: "column",
                    width: `${isNonMobile ? "30%" : "inherite"}`,
                    textAlign: `${isNonMobile ? "inherite" : "center"}`
                  }}
                >
                  <Typography variant="h4">{iteam.title}</Typography>
                {isNonMobile &&  <Typography>height: {iteam.height}</Typography>}
                {isNonMobile &&  <Typography>width: {iteam.width}</Typography>}
                </Box>

                <Box
                  sx={{
                    marginLeft: "10%",
                    display: `${isNonMobile ? "flex" : "none"}`,
                    flexDirection: "column",
                    width: "20%"
                  }}
                >
                  <Typography variant="h4">Price : {iteam.price}</Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "bolder",
                    marginTop: `${isNonMobile ? "15px" : "5%"}`,
                    backgroundColor: theme.palette.secondary[500],
                    color: theme.palette.background.default,
                    height: "40px",
                    width: "70px",
                    marginLeft: `${isNonMobile ? "10%" : "inherite"}`,
                  }}
                >
                  view
                </Button>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
