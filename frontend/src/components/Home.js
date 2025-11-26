import React, {useState} from "react";
import {Box, Typography, Button, TextField, InputAdornment, Divider, Badge, Card, CardContent, CardMedia,} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewListIcon from '@mui/icons-material/ViewList';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import "../AddButton.css"



function Home() {

    const category = ["all","drinks", "food"];
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [menuActive, setMenuActive] = useState("Menu");
    const [totalItem, setTotalItem] = useState(0);
    const menuItems = [
        { label:"Menu", icon: <FastfoodIcon/>, },
        { label:"Cart", icon: <ShoppingCartIcon/>, badge:1},
        { label:"Order", icon: <ViewListIcon/>,badge:2 },
        { label:"Admin", icon: <VerifiedUserIcon/>, },
    ]
    const [items, setItems] = useState([
        { name: "matcha", category: "drinks", price: "RM 15.50", img: "/img/sample-image.jpg" },
        { name: "chicken chop", category: "food", price: "RM 20.50", img: "/img/sample-image.jpg" },
        { name: "Mee Goreng Kaw", category: "food", price: "RM 13.50", img: "/img/sample-image.jpg" },
        { name: "Mee Goreng Kaw", category: "food", price: "RM 13.50", img: "/img/sample-image.jpg" },
        { name: "matcha", category: "drinks", price: "RM 15.50", img: "/img/sample-image.jpg" },
        { name: "chicken chop", category: "food", price: "RM 20.50", img: "/img/sample-image.jpg" },
        { name: "Mee Goreng Kaw", category: "food", price: "RM 13.50", img: "/img/sample-image.jpg" },
        { name: "Mee Goreng Kaw", category: "food", price: "RM 13.50", img: "/img/sample-image.jpg" },
    ])

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
    top={140}
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
        mt={25}
        display="grid"
        gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
        }}
        gap={2}
        >
        
    
        {items
        .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
        .map((item, index) => (
            <Card sx={{position:"relative"}} key={index}>

                
            <Box className="add-button-container">
                 {totalItem === 0 ? (
                    <Box className="border-box">
                            <Button className="add-btn"
                            onClick={() => setTotalItem((prev) => prev+1)}
                            >+</Button>
                    </Box>
                 ) : (
                    <Box className="border-box">
                             <Button className="minus-btn"
                            onClick={() => setTotalItem((prev) => prev-1)}
                            >-
                            </Button>
                            <Button className="total-btn" >{totalItem}</Button>
                            <Button className="add-btn"
                            onClick={() => setTotalItem((prev) => prev+1)}
                            >+
                            </Button>
                        </Box>  
                    )}                    
            </Box>

                <CardMedia component="img" image={item.img}/>
                <CardContent sx={{display:"flex", flexDirection:"column"}}>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.price}</Typography>                   
                </CardContent>
            </Card>
        ))}

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
            <Button variant="contained"
            fullWidth
            sx={{borderRadius: 10, height:"50px", mb:2}}
            > 
            {totalItem} item selected - View Cart 
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
                onClick={() => {setMenuActive(menu.label)}}
                color={ menuActive === menu.label ? "primary" : "secondary"}
                sx={{display:"flex", flex:1, flexDirection:"column", alignItems:"center"}}
                >
                
                {menu.badge ? (
                    <Badge badgeContent={menu.badge} color="primary">
                         {menu.icon}
                    </Badge>
                ) : (
                    menu.icon
                )}                  
                {menu.label}
                </Button>
            ))}
            
        </Box>
    </Box>

    </Box>
  
)
}

export default Home;