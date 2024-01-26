import React, { useContext, useRef } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import { Add, Delete, KeyboardArrowDownOutlined } from "@mui/icons-material";
import ProductContext from "../context/ProductContext";

export default function Products() {
  // to get props provided to outlet component in rootLayout
  const isNonMobile = useOutletContext();

  // to get theme, that we setted earlier
  const theme = useTheme();

  // to use navigation
  const navigate = useNavigate();

  // to get products form ProductContext
  const { prods, isProdsAvilable, fetchProds } = useContext(ProductContext);

  // when click on delete button 
  // const btnRef = useRef(null);
  const handleDeleteBtnClick = async(id) =>{
    const url = `${process.env.REACT_APP_MY_IP}/storeproducts/deleteprod/${id}`
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1YjM5YWE5MzUyNGE5NmQ4YWM1MGU0YSJ9LCJpYXQiOjE3MDYyNzA0MjZ9.oYKh0yUvilGRpJAHwz2vknTJC875Q3d7JmzgYTLAIYk"
      },
    })

    const data = await response.json();
    console.log(data);
    if(data.signal === "green") {
      alert("succesfull");
      fetchProds();
    }
    else alert("some error occured");
  }


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
            onClick={() => navigate("/AddProduct")}
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
                key={iteam._id}
                sx={{
                  padding: `${isNonMobile ? "10px 0px 10px 10px" : "inherite"}`,
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
                    textAlign: `${isNonMobile ? "inherite" : "center"}`,
                  }}
                >
                  <Typography variant="h4">{iteam.title}</Typography>
                  {isNonMobile && (
                    <Typography>height: {iteam.height}</Typography>
                  )}
                  {isNonMobile && <Typography>width: {iteam.width}</Typography>}
                </Box>

                <Box
                  sx={{
                    marginLeft: "10%",
                    display: `${isNonMobile ? "flex" : "none"}`,
                    flexDirection: "column",
                    width: "20%",
                  }}
                >
                  <Typography variant="h4">Price : {iteam.price}</Typography>
                </Box>

                <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:"center",
                  // border: "2px solid red",
                  width:`${isNonMobile ? "25%" : "inherite"}`,
                }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: "bolder",
                      // marginTop: `${isNonMobile ? "15px" : "5%"}`,
                      backgroundColor: theme.palette.secondary[500],
                      color: theme.palette.background.default,
                      height: "35px",
                      width: "70px",
                      // marginLeft: `${isNonMobile ? "10%" : "inherite"}`,
                    }}
                  >
                    view
                  </Button>
                  <Delete sx={{marginLeft: "25%", fontSize: "25px", color: "red"}} onClick={() => handleDeleteBtnClick(iteam._id)}/>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
