import React, { useContext, useState } from "react";
import { Box, Button, Grid, Grow, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import { Add, Edit } from "@mui/icons-material";
import ProductContext from "../context/ProductContext";
import UpdateProductContext from "../context/UpdateProductContext";

export default function Products2() {
  let tt = 0;
  // to hold value of current choosen Category 
  const [catValue, setCatValue] = useState("ALL");
  // to tell whether menu should be open or not 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // to handle Category change 
  const handleCategoryChange = async (event) => {
    // set change value 
    setCatValue(event.target.value)

    if(event.target.value === "ALL"){
      setTempProds(prods);
      return;
    }
    
    const data = prods.filter((iteam) =>  {return (iteam.category === event.target.value || iteam.prodname === event.target.value)})
    setTempProds(data);
  }

  // to get props provided to outlet component in rootLayout
  const isNonMobile = useOutletContext();

  // to get theme, that we setted earlier
  const theme = useTheme();

  // to use navigation
  const navigate = useNavigate();

  // to get products form ProductContext
  const { prods, isProdsAvilable, setProds } = useContext(ProductContext);

  // to use only limited data 
  const [tempProds, setTempProds] = useState(prods);

  // to send product for updation
  const { setUpdateProd } = useContext(UpdateProductContext);

  // when click on delete button
  // const btnRef = useRef(null);
  const handleDeleteBtnClick = async (id) => {
    const url = `${process.env.REACT_APP_MY_IP}/storeproducts/deleteprod/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1YjM5YWE5MzUyNGE5NmQ4YWM1MGU0YSJ9LCJpYXQiOjE3MDYyNzA0MjZ9.oYKh0yUvilGRpJAHwz2vknTJC875Q3d7JmzgYTLAIYk",
      },
    });

    const data = await response.json();

    if (data.signal === "green") {
      alert("succesfull");

      // to remove current product from product array
      const data = prods?.filter((iteam) => {
        return iteam._id !== id;
      });
      setProds(data);
    } else alert("some error occured");
  };

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
        }}
      >
        <FlexBetween>
          <Select
            size="small"
            open={isMenuOpen}
            sx={{
              fontWeight: "bold",
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.background.default
            }} 
             value={catValue} 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             onChange={handleCategoryChange}>
              <MenuItem value="ALL">
               ALL
              </MenuItem>
              <MenuItem value={"mobile"}>mobile</MenuItem>
              <MenuItem value={"laptop"}>laptop</MenuItem>
              <MenuItem value={"headph"}>Headph</MenuItem>
              <MenuItem value={"watch"}>watch</MenuItem>
            </Select>

          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.background.default
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
          justifyContent="space-evenly"
          // sx={{ border: "2px solid red" }}
          rowGap={3}
          columnGap={1}
        >
          {tempProds?.map((iteam) => {
            tt += 500;
            if(tt === 3000) tt = 500;
            return (
              <Grow in="true" timeout={tt}>
                <Grid
                  iteam="true"
                  xs={`${isNonMobile ? 2 : 5}`}
                  width="150px"
                  height="300px"
                  key={iteam._id}
                  sx={{
                    backgroundColor: theme.palette.primary[800],
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: `column`,
                    alignItems: "center",
                    justifyContent: "felx-start",
                    padding: "10px",
                    gap: "10px",
                    ':hover': {
                      boxShadow: `1px 1px 3px 3px ${theme.palette.background.alt} `
                    }
                  }}
                >
                  {/* image  */}
                  <Box
                    component="img"
                    sx={{
                      height: "30%",
                      width: "80%",
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
                  <Box sx={{fontWeight : "bold"}} height="55%" width="90%">
                    <Typography variant="h4" sx={{fontWeight : "bold"}}>{iteam.title}</Typography>
                    <Typography sx={{marginTop: "5px", fontWeight : "bold", color: "#08a187"}}>Available : 521</Typography>
                    <Typography sx={{marginTop: "5px", fontWeight : "bold", color: "blue"}}>Already sold : 521</Typography>
                    <Typography sx={{marginTop: "5px", fontWeight : "bold"}}>Market Price : {iteam.dummyPrice}</Typography>
                    <Typography sx={{marginTop: "5px", fontWeight : "bold"}}>Sale Price : {iteam.price}</Typography>
                  </Box>

                  {/* Action buttons */}
                  <FlexBetween width="90%">
                    <Button
                    size="small"
                      variant="contained"
                      sx={{
                        color: theme.palette.background.default,
                        background: theme.palette.secondary[500]
                      }}
                      onClick={() => {
                        setUpdateProd(iteam);
                        navigate("/UpdateProduct");
                      }}
                      endIcon={<Edit/>}
                    >
                      Edit
                    </Button>
                    <Button
                    size="small"
                      variant="contained"
                      sx={{color: "orangered", border: "1px solid orangered", overflow: "hidden"}}
                      onClick={() => handleDeleteBtnClick(iteam._id)}
                    >
                      Delete
                    </Button>
                  </FlexBetween>
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
