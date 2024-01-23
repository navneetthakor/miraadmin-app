import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Add, CloudUpload, Store } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
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

  // to render images 
  const render = new FileReader();

  // to get theme object
  const theme = useTheme();

  // to Store the images 
  const [uploadedImages, setUploadedImages] = useState(null);

  // function to add uploadedImages to array 
  const handleImageSubmit = (event) =>{
    // let data = [];
    // uploadedImages?.map((iteam) => {
    //   data = [...data,iteam];
    // })
    // data = [...data, event.targer.files];
    setUploadedImages(event.target.files);
  }

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
          height="500px"
          boxShadow={true}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "8px",
            marginInline: `${isNonMobile ? "inherite" : "auto"}`,
            padding: "2% 5%",
          }}
        >
          {fieldArray.map((iteam) => {
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
              rows={5}
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
            gap: "5%"
          }}
        >
          {uploadedImages===null &&
          <Box
          sx={{
            border: "2px dotted white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70%",
            width: "80%"
          }}
          >
            <Add />
          </Box>
          }
          {uploadedImages!==null &&
          <Grid
          sx={{
            border: "2px dotted white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70%",
            width: "80%"
          }}
          >
            {
            uploadedImages.map((iteam)=>{
              const url = URL.createObjectURL(iteam);
              console.log(url);
              return(
                <img
                  src={url}
                  alt=""
                  height="50px"
                  width="50px"
                />
              )
            })}
          </Grid>
          }
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{
              background: theme.palette.secondary[500],
              color: theme.palette.background.default,
            }}
            onChange={handleImageSubmit}
          >
            Upload files
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
      </Box>

      <Box 
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
      >
        <Button
          sx={{
            marginTop: "5%",
            backgroundColor: theme.palette.secondary[500],
            color: theme.palette.background.default,
          }}
          startIcon={<Add />}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
}
