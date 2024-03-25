import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Add, CloudUpload, Delete} from "@mui/icons-material";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Header from "../components/Header";


export default function AddProduct() {
  // ---------------------------------to get whether divice is mobile or not
  const isNonMobile = useOutletContext();

  // to referesh product page 
  const { fetchProds } = useContext(ProductContext);

  // ---------------------------------to store values 
  const [object, setObject] = useState({
    title: "",
    company: "",
    model:"",
    height:"",
    width: "",
    price: "",
    dummyPrice: "",
    category: "",
    description: ""
  })

  const handleObjectChange = (event) => {
    setObject({...object, [event.target.name]: event.target.value});
    console.log(object);
  }

  //--------------------------------- array for displaing required fields
const fieldArray = [
  {
    dobule: false,
    name: "title",
    placeholder: "vivo T2 5G Pro...",
  },
  {
    dobule: true,
    name1: "company",
    placeholder1: "vivo...",
    name2: "sku",
    placeholder2: "#mobVivo01",
  },
  {
    dobule: true,
    name1: "dimension",
    placeholder1: "6.5 * 4.3 * 0.5",
    name2: "weight",
    placeholder2: "180",
  },
  {
    dobule: true,
    name1: "mrp",
    placeholder1: "799",
    name2: "sellprice",
    placeholder2: "499",
  },
  {
    dobule: true,
    name1: "stock",
    placeholder1: "123",
    name2: "soldstock",
    placeholder2: "11",
  },
];

// ------------------------------------for upload button
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

  // -----------------------------to get theme object
  const theme = useTheme();

  //------------------------------ to Store the images
  const [uploadedImages, setUploadedImages] = useState([]);

  // ----------------------------function to add uploadedImages to array
  const handleImageSubmit = (event) => {
    if (uploadedImages === null) setUploadedImages([event.target.files]);
    else setUploadedImages([...uploadedImages, event.target.files]);
  };

  // ---------------------------to remove image
  const handleImageRemove = (iteam) => {
    const data = uploadedImages?.filter((it) => {
      return it !== iteam;
    });
    setUploadedImages(data);
  };

  // ---------------------------to add product on submit 
  const handleProdSubmit = async() =>{
    // creating formData object 
    const formData = new FormData();

    // adding images to formData 
    for(let i=0; i<uploadedImages.length; i++) formData.append("images", uploadedImages[i][0]);

    // appending object to formData
    for(const [key,value] of Object.entries(object)){
      formData.append(key, value);
    }

    // url to perform operation 
    const url = `${process.env.REACT_APP_MY_IP}/storeproducts/addprod`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1YjM5YWE5MzUyNGE5NmQ4YWM1MGU0YSJ9LCJpYXQiOjE3MDYyNzA0MjZ9.oYKh0yUvilGRpJAHwz2vknTJC875Q3d7JmzgYTLAIYk"
      },
      body: formData
    })

    const data = await response.json();

    // if succussfull 
    if(data.signal === "green") {
      alert("succesfull");
      // reload data for product page 
      fetchProds();
    }
    else alert("some error occured");
  }

  // ------------------------------actul returning object -------------------------------
  return (
    <Box
      sx={{
        padding: "3%",
      }}
    >
      
      {/* header of page  */}
      <Header primHeader="Add Product" secHeader="All the fields are required!" />

      {/* image and major fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: `${isNonMobile ? "row" : "column"}`,
          backgroundColor: theme.palette.background.default,
          justifyContent: "center",
          gap: "5%",
          marginTop: "3%",
        }}
      >
        {/* title and all other things  */}
        <Box
          width={`${isNonMobile ? "40%" : "80%"}`}
          height={`${isNonMobile ? "500px" : "inherite"}`}
          boxShadow={true}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "8px",
            marginInline: `${isNonMobile ? "inherite" : "auto"}`,
            padding: "1% 5% 2% 5%",
          }}
        >
          {fieldArray?.map((iteam) => {
            if (iteam.dobule) {
              return (
                <Box
                  sx={{
                    flexGrow: "1",
                    background: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "3%",
                    gap: "5%",
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: "1",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>{iteam.name1}</Typography>
                    <TextField
                      size="small"
                      sx={{
                        marginTop: "5px",
                      }}
                      placeholder={iteam.placeholder1}
                      onChange={handleObjectChange}
                    />
                  </Box>

                  <Box
                    sx={{
                      flexGrow:"1",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>{iteam.name2}</Typography>
                    <TextField
                      size="small"
                      sx={{
                        marginTop: "5px",
                      }}
                      placeholder={iteam.placeholder2}
                      onChange={handleObjectChange}
                    />
                  </Box>
                </Box>
              );
            }

            return (
              <Box
                sx={{
                  background: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "3%",
                }}
              >
                <Typography>{iteam.name}</Typography>
                <TextField
                  size="small"
                  sx={{
                    marginTop: "5px",
                  }}
                  placeholder={iteam.placeholder}
                  onChange={handleObjectChange}
                />
              </Box>
            );
          })}

          {/* Category dropdown  */}
          <Typography sx={{marginTop: "3%"}}>Category</Typography>
            <Select
            size="small"
            sx={{ marginTop: "5px"}} 
             value={object.category} 
             onChange={handleObjectChange}>
              <MenuItem disabled value=" ">
                --Select category--
              </MenuItem>
              <MenuItem value={"mobile"}>mobile</MenuItem>
              <MenuItem value={"laptop"}>Laptop</MenuItem>
              <MenuItem value={"headph"}>Head Phone</MenuItem>
              <MenuItem value={"watch"}>Watch</MenuItem>
            </Select>
          {/* </Box> */}

          {/* Description  */}
          <Box
            sx={{
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              marginTop: "3%",
            }}
          >
            <Typography>Description</Typography>
            <TextField
            onChange={handleObjectChange}
              size="small"
              rows={3}
              multiline="true"
              sx={{
                marginTop: "5px",
              }}
              placeholder="Add description"
            />
          </Box>
        </Box>

        {/* images  */}
        <Box
          width={`${isNonMobile ? "40%" : "80%"}`}
          height="500px"
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "8px",
            marginInline: `${isNonMobile ? "inherite" : "auto"}`,
            marginTop: `${isNonMobile ? "inherite" : "5%"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5%",
          }}
        >
          <ImageList
            variant="quilted"
            cols={2}
            sx={{
              border: "2px dotted white",
              display: `${uploadedImages?.length <= 1 ? "flex" : "inherite"}`,
              alignItems: `${
                uploadedImages?.length <= 1 ? "center" : "inherite"
              }`,
              justifyContent: `${
                uploadedImages?.length <= 1 ? "center" : "inherite"
              }`,
              height: "70%",
              width: "80%",
            }}
          >
            {uploadedImages?.length <= 0 && <Add />}

            {uploadedImages?.map((iteam) => {

              const url = URL.createObjectURL(iteam[0]);
              return (
                <ImageListItem key={url} sx={{ overflow: "hidden" }}>
                  <Delete
                    sx={{ position: "absolute", color: "red" }}
                    onClick={() => handleImageRemove(iteam)}
                  />
                  <img src={url} alt="" height="100%" width="100%" />
                </ImageListItem>
              );
            })}
          </ImageList>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{
              background: theme.palette.secondary[500],
              color: theme.palette.background.default,
              "&:hover": {
                color: "white",
              },
            }}
            onChange={handleImageSubmit}
          >
            Upload files
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
      </Box>

      {/* Bottom buttons  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
          gap: "20%",
        }}
      >
        {/* submit button */}
        <Button
          sx={{
            // height: "40px",
            backgroundColor: theme.palette.secondary[500],
            color: theme.palette.background.default,
            fontWeight: "600",
            "&:hover": {
              color: "white",
            },
          }}
          onClick={handleProdSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
