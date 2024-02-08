import { useTheme } from '@emotion/react'
import { Box, Card, CardContent, Grow, Icon, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import FlexBetween from '../components/FlexBetween';
import { AddTask, FactCheck, FactCheckOutlined } from '@mui/icons-material';
import Header from '../components/Header';

// preparing card 
const cards = [
  {
    icon: <AddTask sx={{width: "27px",height: "27px"}} />,
    iconColor: "blue",
    name: "Orders Completed",
    number: "2,345"
  },
  {
    icon: <FactCheckOutlined sx={{width: "27px",height: "27px"}} />,
    iconColor: "#08a187",
    name: "Orders Confirmed",
    number: "323",
  },
  {
    icon: <FactCheck sx={{width: "27px",height: "27px"}} />,
    iconColor: "orangered",
    name: "Orders Cancelled",
    number: "18",
  },
  {
    icon: <FactCheckOutlined sx={{width: "27px",height: "27px"}} />,
    iconColor: "lightgray",
    name: "Orders Refunded",
    number: "7",
  },
]

export default function Orders() {
    let tt = 0;

    // to use theme object 
    const theme = useTheme();

    // to put cards 
    //  to put the cards
  const putCards = cards.map((iteam) => {
    tt += 500;
    return (
      <Grow in="true" timeout={tt}>
        <Card
          key={iteam.header}
          sx={{
            height: "150px",
            width: "200px",
            backgroundColor: theme.palette.primary[800],
            boxShadow: `1px 1px 10px ${theme.palette.background.alt} `,
            ':hover': {
              boxShadow: `1px 1px 3px 3px ${theme.palette.background.alt} `
            }
          }}
        >
          <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            marginLeft: "10px"
          }}
          >
            <Box component={Icon} sx={{
              background: `${iteam.iconColor}`,
              color: "black",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px"
              }}>
                {iteam.icon}
            </Box>

            <Typography sx={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px"}}>
              {iteam.name}
            </Typography>
            <Typography variant="h3" sx={{  fontWeight: "bold" }}>
              {iteam.number}
            </Typography>
            
          </CardContent>
        </Card>
      </Grow>
    );
  });
  return (
    <Box
    sx={{
      padding: "40px 20px",
    }}
    >
      {/* header */}
      <Header primHeader="Orders" secHeader="List of Orders" />
    
    {/* cards container */}
    <Box
    sx={{
      paddingTop: "10px",
      display: "flex",
      gap: "10px",
    }}
    >
      <Box
      gap="10px"
      sx={{
        height: "150px",
        width: "400px",
        backgroundColor: theme.palette.primary[800],
        boxShadow: `1px 1px 10px ${theme.palette.background.alt} `,
        ':hover': {
          boxShadow: `1px 1px 3px 3px ${theme.palette.background.alt} `
        },
        padding: "10px 20px",
        borderRadius: "5px"
      }}
      >
        <Typography variant='h4' fontWeight="bold" sx={{marginBottom: "10px"}}>Average Rate (%)</Typography>

        <Box sx={{marginBottom: "10px"}}>
        <FlexBetween>
          <Typography fontWeight="bold">Product Views</Typography>
          <Typography fontWeight="bold">92%</Typography>
        </FlexBetween>
        <LinearProgress sx={{borderRadius: "8px",height: "15px"}} variant='determinate' value={92}/>
        </Box>

        <Box>
        <FlexBetween>
          <Typography fontWeight="bold">Card Abdondonment Rate</Typography>
          <Typography fontWeight="bold">12%</Typography>
        </FlexBetween>
        <LinearProgress sx={{borderRadius: "8px",height: "15px"}} variant='determinate' value={12}/>
        </Box>
      </Box>

      {/* cards  */}
      {putCards}
    </Box>

    {/* list of Products  */}
    <Box
    sx={{
      backgroundColor: theme.palette.primary[800],
      height:"200px",
      marginTop:"50px"
    }}
    >

    </Box>
      
    </Box>
  )
}
