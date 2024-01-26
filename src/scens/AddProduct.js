import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Add, CloudUpload, Delete, Store } from "@mui/icons-material";
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
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

// array for displaing required fields
const fieldArray = [
  {
    dobule: false,
    name: "Title",
    placeholder: "vivo T2 5G Pro...",
  },
  {
    dobule: true,
    name1: "company",
    placeholder1: "vivo...",
    name2: "model",
    placeholder2: "T2 5G pro...",
  },
  {
    dobule: true,
    name1: "height",
    placeholder1: "6.5 inches",
    name2: "width",
    placeholder2: "4.5 inches",
  },
  {
    dobule: true,
    name1: "price",
    placeholder1: "499",
    name2: "DummyPrice",
    placeholder2: "799",
  },
];

// for upload button
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

export default function AddProduct() {
  // to get whether divice is mobile or not
  const isNonMobile = useOutletContext();

  // to get theme object
  const theme = useTheme();

  // to Store the images
  const [uploadedImages, setUploadedImages] = useState(null);

  // function to add uploadedImages to array
  const handleImageSubmit = (event) => {
    if (uploadedImages === null) setUploadedImages([event.target.files]);
    else setUploadedImages([...uploadedImages, event.target.files]);
  };

  // to remove image
  const handleImageRemove = (iteam) => {
    const data = uploadedImages?.filter((it) => {
      return it !== iteam;
    });
    setUploadedImages(data);
  };

  // for dropdown list
  const [value, setValue] = useState("Category");

  // on dropdown value change
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

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
        <Typography variant="h1">Add Product</Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.secondary[300],
          }}
        >
          All the fields are required!
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
                    background: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "3%",
                    gap: "5%",
                  }}
                >
                  <Box
                    sx={{
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
                    />
                  </Box>

                  <Box
                    sx={{
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
                />
              </Box>
            );
          })}

          {/* Category dropdown  */}
          <Typography sx={{marginTop: "3%"}}>Category</Typography>
            <Select
            size="small"
            sx={{ marginTop: "5px"}} 
             value={value} 
             onChange={handleValueChange}>
              <MenuItem disabled value=" ">
                --Select category--
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
