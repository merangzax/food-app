import React, { useEffect} from "react";
import {Box, Typography, Button, TextField, InputAdornment, Badge, Card, CardContent, CardMedia,} from "@mui/material"
import { useHomeCrudeContext } from "../context/HomeCrudeContext";
import SearchIcon from '@mui/icons-material/Search';
import "../AddButton.css"


function Home() {

    const {navigate, query, setQuery, totalItem, handleAdd, handleMinus, selectedCategory, setSelectedCategory,
        filteredItem, setMenuActive, menuActive, category, menuItems, totalOrder,
    } = useHomeCrudeContext();

    useEffect(() => {
         setMenuActive("Menu") 
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
    bgcolor="primary.main"
    left={0}
    top={0}
    width="100%"
    zIndex={1}
    >
        <Box 
        name="top-bar"
        display="flex"
        alignItems="center"
        mt={1} mb={1} ml={2} mr={2}
        >
           <Box
           name="logo-box"
           display="flex"
           flexDirection="column"
           textAlign="center"
           borderRadius={3}
           sx={{mr:2, bgcolor:"primary.main", p:0.5}}>
            <Typography color="white" fontWeight="bold" fontSize="22px">JOM</Typography>  
            <Typography color="white" fontWeight="light" mt="-12px">ORDER</Typography>         
           </Box>

           <Typography 
           variant="h6"
           color="white">
            Order for Table 15 
           </Typography>
        </Box>

        <Box 
        name="search-bar" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        height={40}
        bgcolor="white"
        borderRadius={20}
        mt={1} mb={2} ml={2} mr={2}
        >
            <TextField 
            fullWidth
            placeholder="Search Food or Drinks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                            <SearchIcon/>
                    </InputAdornment>
                ),
            }}
            />
        </Box>

    </Box>

    <Box
    name="fixed-top-part-2"
    position="fixed"
    bgcolor="white"
    left={0}
    top={125}
    width="100%"
    zIndex={1}
    >

        <Box 
        name="category-bar" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        mt={1} mb={1} ml={2} mr={2}
        >
            {category.map((category, index) => (
            <Button
            color="black"
            onClick={() => {setSelectedCategory(category)}}
            variant={selectedCategory === category ? "outlined" : ""}
            sx={{ display:"flex", flex:1,  mr:1, borderWidth:2, borderRadius:20}}
            >
            {category}
            </Button>
        ))}
        </Box>
    </Box>
    
    
        <Box
        name ="item-display"
        mb={16}
        mt={23}
        display="grid"
        gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
        }}
        gap={2}
        >
        
        
        {filteredItem.length > 0 ? (
            filteredItem.map((item, index) => (
            <Card sx={{position:"relative"}} key={index}>

                
            <Box className="add-button-container"
            right={10}
            bottom={100}
            >
                 {item.qty === 0 ? (
                    <Box className="border-box">
                            <Button className="add-btn"
                            onClick={() => handleAdd(item.id)}
                            >+</Button>
                    </Box>
                 ) : (
                    <Box className="border-box">
                             <Button className="minus-btn"
                            onClick={() => handleMinus(item.id)}
                            >-
                            </Button>
                            <Button className="total-btn" >{item.qty}</Button>
                            <Button className="add-btn"
                            onClick={() => handleAdd(item.id)}
                            >+
                            </Button>
                        </Box>  
                    )}                    
            </Box>

                <CardMedia component="img" image={item.img}/>
                <CardContent sx={{display:"flex", flexDirection:"column"}}>
                    <Typography>{item.name}</Typography>
                    <Typography>RM {item.price.toFixed(2)}</Typography>                   
                </CardContent>
            </Card>
        ))
     ) : (
        <Box gridColumn="1/-1" >
            <Typography align="center" mt={3} color="grey">
            Food unavailable, please search again.
            </Typography>
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
        justifyContent="center" 
        alignItems="center"
        mr={2} ml={2} mt={2}
        >
            {totalItem ? (
            <Button 
            variant="contained"
            fullWidth
            sx={{borderRadius: 10, height:"50px", mb:2}}
            onClick={()=> navigate("/cart")}
            > 
            {totalItem} items selected - View Cart 
            </Button>
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

export default Home;