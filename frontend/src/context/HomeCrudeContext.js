import { createContext, useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewListIcon from '@mui/icons-material/ViewList';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import sampleimg from "../img/sample-image.jpg";

const HomeCrudeContext = createContext();

export function HomeCrudeContextProvider({children}) {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [totalItem, setTotalItem] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [menuActive, setMenuActive] = useState("");
    const category = ["all","drinks", "food"];
    const [items, setItems] = useState([
        { id:1, name: "matcha", category: "drinks", price: 15.50, img: "https://freeimage.host/content/images/system/logo_homepage_1577917990964_282d1e.webp", qty: 0 },
        { id:2, name: "chicken chop", category: "food", price: 20.50, img: sampleimg , qty: 0, order:0 },
        { id:3, name: "Mee Goreng Kaw 8", category: "food", price: 13.50, img: sampleimg, qty: 0, order:0  },
        { id:4, name: "Mee Goreng Kaw 9", category: "food", price: 13.50, img: sampleimg, qty: 0, order:0 },
        { id:5, name: "matcha 2", category: "drinks", price: 15.50, img: sampleimg, qty: 0, order:0 },
        { id:6, name: "chicken chop 2", category: "food", price: 20.50, img: sampleimg, qty: 0, order:0 },
        { id:7, name: "Mee Goreng Kaw 1", category: "food", price: 13.50, img: sampleimg, qty: 0, order:0 },
        { id:8, name: "Mee Goreng Kaw 2", category: "food", price: 13.50, img: sampleimg, qty: 0, order:0 },
    ])

    const menuItems = [
        { label:"Menu", icon: <FastfoodIcon/>, },
        { label:"Cart", icon: <ShoppingCartIcon/>, badge:2},
        { label:"Order", icon: <ViewListIcon/>,badge:2 },
        { label:"Admin", icon: <VerifiedUserIcon/>, },
    ]

    const filteredItem = items
        .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) )

    // handle addition
    const handleAdd = (id) => { 
        setItems((prev) => 
            prev.map((item) =>
                item.id === id ? {...item, qty:item.qty + 1} : item
            )
        )
        setTotalItem((prev) => prev + 1)
    }    
    //handle minus
    const handleMinus = (id) => {
        setItems((prev) =>
            prev.map((item) => 
                item.id === id ? {...item, qty:item.qty - 1} : item
            )
        )
        setTotalItem((prev) => prev - 1)
    } 

    const totalPrice = items.reduce((sum,item) => {
        return sum + item.price * item.qty;
    }, 0 );

    const checkoutHandler = () => {
        
        setTotalOrder(prev => prev + totalItem)
        setItems(prev => prev.map(item => ({...item, order:(item.order || 0 ) + item.qty, qty:0})))
        setTotalItem(0);
    }

    const value = {
        query,
        totalItem,
        items,
        selectedCategory,
        filteredItem,
        menuActive,
        category,
        menuItems,
        totalOrder,
        totalPrice,
        checkoutHandler,
        setTotalOrder,
        setMenuActive,
        setSelectedCategory,
        setItems,
        setTotalItem,
        setQuery,
        navigate,
        handleAdd,
        handleMinus,
    }

    return <HomeCrudeContext.Provider value={value}>
        {children}
    </HomeCrudeContext.Provider>
}

export function useHomeCrudeContext() {
    return useContext(HomeCrudeContext);
}