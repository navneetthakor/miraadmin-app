import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { CloudUpload} from "@mui/icons-material";
import {
  Box,
  Button,
  Grow,
  ImageList,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import UpdateProductContext from "../context/UpdateProductContext";


export default function AddProduct() {
  let tt = 0;
  // ---------------------------------to get whether divice is mobile or not
  const isNonMobile = useOutletContext();

  // to referesh product page 
  const { fetchProds } = useContext(ProductContext);

//   to get data provided by view button 
const { updateProd, setUpdateProd} = useContext(UpdateProductContext);

  // ---------------------------------to update values 
  const handleTitleChange = (event) =>{
     setUpdateProd({...updateProd, title: event.target.value});
  }
  const handleCompanyChange = (event) =>{
    setUpdateProd({...updateProd, company: event.target.value});
  }
  const handleModelChange = (event) =>{
    setUpdateProd({...updateProd, model: event.target.value});
  }
  const handleHeightChange = (event) =>{
    setUpdateProd({...updateProd, height: event.target.value});
  }
  const handleWidthChange = (event) =>{
    setUpdateProd({...updateProd, width: event.target.value});
  }
  const handlePriceChange = (event) =>{
    setUpdateProd({...updateProd, price: event.target.value});
  }
  const handleDummyPriceChange = (event) =>{
    setUpdateProd({...updateProd, dummyPrice: event.target.value});
  }
  const handleCategoryChange = (event) =>{
    setUpdateProd({...updateProd, category: event.target.value});
  }
  const handleDescriptionChange = (event) =>{
    setUpdateProd({...updateProd, description: event.target.value});
  }

  //--------------------------------- array for displaing required fields
const fieldArray = [
  {
    dobule: false,
    name: "Title",
    placeholder: "vivo T2 5G Pro...",
    value: updateProd.title,
    onChange: handleTitleChange
  },
  {
    dobule: true,
    name1: "company",
    placeholder1: "vivo...",
    value1: updateProd.company,
    onChange1: handleCompanyChange,
    name2: "model",
    placeholder2: "T2 5G pro...",
    value2: updateProd.model,
    onChange2: handleModelChange
  },
  {
    dobule: true,
    name1: "height",
    placeholder1: "6.5 inches",
    value1: updateProd.height,
    onChange1: handleHeightChange,
    name2: "width",
    placeholder2: "4.5 inches",
    value2: updateProd.width,
    onChange2: handleWidthChange
  },
  {
    dobule: true,
    name1: "price",
    placeholder1: "499",
    value1: updateProd.price,
    onChange1: handlePriceChange,
    name2: "DummyPrice",
    placeholder2: "799",
    value2: updateProd.dummyPrice,
    onChange2: handleDummyPriceChange
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
//   const [uploadedImages, setUploadedImages] = useState([]);

  // ----------------------------function to add uploadedImages to array
//   const handleImageSubmit = (event) => {
//     if (uploadedImages === null) setUploadedImages([event.target.files]);
//     else setUploadedImages([...uploadedImages, event.target.files]);
//   };

  // ---------------------------to remove image
//   const handleImageRemove = (iteam) => {
//     const data = uploadedImages?.filter((it) => {
//       return it !== iteam;
//     });
//     setUploadedImages(data);
//   };

  // ---------------------------to add product on submit 
  const handleProdSubmit = async() =>{
    // creating formData object 
    // const formData = new FormData();

    // adding images to formData 
    // for(let i=0; i<uploadedImages.length; i++) formData.append("images", uploadedImages[i][0]);

    // appending object to formData
    // for(const [key,value] of Object.entries(object)){
    //   formData.append(key, value);
    // }

    // preparing data to send in body 
    const bodyData = JSON.stringify(updateProd);

    // url to perform operation 
    const url = `${process.env.REACT_APP_MY_IP}/storeproducts/updateprod/${updateProd._id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY1YjM5YWE5MzUyNGE5NmQ4YWM1MGU0YSJ9LCJpYXQiOjE3MDYyNzA0MjZ9.oYKh0yUvilGRpJAHwz2vknTJC875Q3d7JmzgYTLAIYk"
      },
      body: bodyData
    })

    const data = await response.json();

    // if succussfull 
    if(data.signal === "green") {
      alert("succesfull");

      console.log("Your data :", JSON.stringify(updateProd));
      console.log("recevied data : ", data.product);
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
        <Typography variant="h1">Update Product</Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.secondary[300],
          }}
        >
          revisite required fields!
        </Typography>
      </Box>

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
        <Grow in="true" timeout={tt += 500}>
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
                      value={iteam.value1}
                      onChange={iteam.onChange1}
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
                      value={iteam.value2}
                      onChange={iteam.onChange2}
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
                  value={iteam.value}
                  onChange={iteam.onChange}
                />
              </Box>
            );
          })}

          {/* Category dropdown  */}
          <Typography sx={{marginTop: "3%"}}>Category</Typography>
            <Select
            size="small"
            sx={{ marginTop: "5px"}} 
             value={updateProd.category} 
             onChange={handleCategoryChange}>
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
            onChange={handleDescriptionChange}
              size="small"
              rows={3}
              multiline="true"
              sx={{
                marginTop: "5px",
              }}
              placeholder="Add description"
              value={updateProd.description}
            />
          </Box>
        </Box>
        </Grow>

        {/* images  */}
        <Grow in="true" timeout={tt += 500}>
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
              display: `${updateProd.images?.length <= 1 ? "flex" : "inherite"}`,
              alignItems: `${
                updateProd.images?.length <= 1 ? "center" : "inherite"
              }`,
              justifyContent: `${
                updateProd.images?.length <= 1 ? "center" : "inherite"
              }`,
              height: "70%",
              width: "80%",
            }}
          >

            {
                updateProd.images.map((iteam) =>{
                    return <img src={`${process.env.REACT_APP_MY_IP}/${iteam}`.replace(/\\/g, "/")} height="100%" width="100%" alt=""/>
                })
            }
            {/* {uploadedImages?.length <= 0 && <Add />}

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
            })} */}
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
            // onChange={handleImageSubmit}
          >
            Upload files
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        </Grow>
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
          Update
        </Button>
      </Box>
    </Box>
  );
}
