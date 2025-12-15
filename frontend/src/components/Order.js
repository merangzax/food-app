import React, {useEffect, useState}  from "react";
import {Box, Typography, Button, Divider, Badge, IconButton, Avatar} from "@mui/material"
import "../AddButton.css"
import { useHomeCrudeContext } from "../context/HomeCrudeContext";
import ClearIcon from '@mui/icons-material/Clear';
import cookingLogo from "../img/cooking-icon.png"

function Order() {

   const {navigate, totalItem, handleAdd, handleMinus,  setMenuActive, menuActive, menuItems, items, totalOrder, 
           totalPrice, checkoutHandler, } = useHomeCrudeContext();
   
   
    useEffect(() => {
          setMenuActive("Order") 
       },[])

    


return (
    <Box 
    name="Main-Home-Box"
    marginLeft={2}
    marginRight={2}
    
    >
    <Box
    name="fixed-top-part-1"
    position="fixed"
    left={0}
    top={0}
    width="100%"
    bgcolor="white"
    zIndex={1}
    >
        <Box 
        name="top-bar"
        display="flex"
        alignItems="center"
        mt={1} mb={1} ml={2} mr={2}
        gap={2}
        >
            <IconButton
            onClick={() => navigate("/menu")}
            >
            <ClearIcon sx={{fontSize:30, color:"#484848ff"}}/>
            </IconButton>         
           
           <Box
           display="flex"
           flexDirection="column"
           mt={0.5} mb={0.5}
           > 
                <Typography 
                variant="h6"
                color="black"
                mb={-0.5}                >
                    Your Order
                </Typography>

                <Typography 
                variant="body2"
                color="black">
                    Table 15
                </Typography>
           </Box>
        </Box>


    </Box>
     
   <Box mt={10} mb={28}>

                <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                mt={15}
                mb={5}
                >
                    <Box component="img" src={cookingLogo} sx={{height:100}} mb={1}/>    
                    <Typography variant="h5" fontWeight="bold" mb={0.5}>Thank you for order!</Typography>
                    <Typography variant="body2" mb={2} ml={5} mr={5}>Your orders are being prepared and will be delivered soon.</Typography>

                </Box>

        {totalOrder ?  (items.map((item, index) => (
            item.order > 0 ? (
                <Box name="main-item"
                key={index}
                display="flex"
                flexDirection="row"
                gap={3}
                mb={4}
                >  
                    <Box>
                        <Avatar 
                        src={item.img}
                        sx={{width:80, height:80, borderRadius:0}}
                        />
                    </Box>

                    <Box position="relative" >
                        <Typography>{item.name}</Typography>
                        <Typography>RM {item.price.toFixed(2)}</Typography>

                        <Box className="add-button-container"
                            left={1}
                            bottom={-5}
                            >                                         
                                <Box className="border-box">
                                    <Button className="total-btn" >{item.order}</Button>
                                </Box>  
                        </Box>
                    </Box>
                </Box>
            ) : ( null )                                           
        ))
        ) : (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        height="80vh"
        >
        <Box component="img" src={cookingLogo} sx={{height:100}} mb={1}/>    
        <Typography variant="h5" fontWeight="bold" mb={0.5}>Thank you for order!</Typography>
        <Typography variant="body2" mb={2} ml={5} mr={5}>Your orders are being prepared and will be delivered soon.</Typography>

        </Box>
        )}

    </Box> 


    
    <Box 
    name="bottom-bar"
    position="fixed"
    bottom={0}
    left={0}
    bgcolor="white"
    width="100%"
    >
        <Box 
        name="view-cart-btn" 
        display="flex" 
        flexDirection="column"
        mr={2} ml={2} mt={2}
        >
            {totalItem ? (
            
            <>
                <Box
                position="relative"
                bgcolor="white"
                width="100%"
                height={50}
                mb={1}
                >
                    <Typography variant="h6"fontWeight="bold" ml={1} mt={-1}>Total - {totalItem} items</Typography>
                    <Typography variant="captions" ml={1}>(incl. fees and tax)</Typography>
                    <Typography 
                    fontWeight="bold"
                    variant="h6" 
                    color="primary.main" 
                    position="absolute" 
                    right={0} bottom={1} mr={2}
                    >
                    RM {totalPrice.toFixed(2)}
                    </Typography>
                </Box>
                
                <Button 
                variant="contained"
                fullWidth
                sx={{borderRadius: 10, height:"50px", mb:2}}
                onClick={() => {
                    checkoutHandler()
                    navigate("/order")
                }}
                > 
                Continue Checkout
                </Button>
            </>
            
            ) : ("")}

        </Box>

        <Box 
        name="bottom-bar-icon" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        mr={1} ml={1}
        >

            {menuItems.map((menu) => (
                <Button
                onClick={() => {
                    setMenuActive(menu.label)
                    navigate(`/${menu.label}`)
                }}
                color={ menuActive === menu.label ? "primary" : "secondary"}
                sx={{display:"flex", flex:1, flexDirection:"column", alignItems:"center"}}
                >

                {menu.label === "Cart" ? (
                    <Badge badgeContent={totalItem} color="primary">
                    {menu.icon}
                    </Badge>
                ) : ( menu.label === "Order" ? (
                    <Badge badgeContent={totalOrder} color="primary">
                    {menu.icon}
                    </Badge>
                ) : (
                    menu.icon
                ))}
                {menu.label}
                </Button>
            ))}
            
        </Box>
    </Box>

    </Box>
  
)
}

export default Order;