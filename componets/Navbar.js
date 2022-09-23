import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import jsCookie from "js-cookie";
// import { Switch } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { Store } from "../utils/store";
import Image from "next/image";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "../utils/classes";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import axios from "axios";
import { useRouter } from "next/router";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const Navbar = ({ darkMode, darkModeChangeHandler }) => {
    const router = useRouter();
  const [cartNum, setCartNum] = useState(0);
  const {
    state: {
      cart: { cartItems },
      userInfo,
    },
    dispatch
  } = useContext(Store);
  useEffect(() => {
    setCartNum(cartItems.length);
  }, [cartItems]);

  const [sidbarVisible, setSidebarVisible] = useState(false);


  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };





    const { enqueueSnackbar } = useSnackbar();
    const [categories, setCategories] = useState([]);
    const [brends, setBrends] = useState([]);
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const { data } = await axios.get(`/api/products/categories`);
          setCategories(data);
        } catch (err) {
          enqueueSnackbar(getError(err), { variant: "error" });
        }
      };
      fetchCategories();
       const fetchBrends = async () => {
         try {
           const { data } = await axios.get(`/api/products/brend`);
           setBrends(data);
         } catch (err) {
           enqueueSnackbar(getError(err), { variant: "error" });
         }
       };
       fetchBrends();
    }, [enqueueSnackbar]);
    
  const res = categories.map(x=>x.name)
  const res2 = brends.map((x) => x.name);


  // поле поиска

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };


  const logoutClickHandler = () => {
    dispatch({type:'USER_LOGOUT'})
    jsCookie.remove('userInfo')
    jsCookie.remove('cartItems')
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push('/')
  }

  return (
    <div className="navbar flex">
      <div className="menu_categ">
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={sidebarOpenHandler}
          sx={classes.menuButton}
        >
          <MenuIcon sx={classes.navbarButton} />
        </IconButton>
      </div>
      <div className="navbar_logo_item">
        <Link href="/">
          <div className="navbar_logo">
            <Image width={50} height={50} src="/img/fast.png" alt="" />
          </div>
        </Link>
      </div>

      <Drawer anchor="left" open={sidbarVisible} onClose={sidebarCloseHandler}>
        <List>
          <ListItem>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Shopping by category</Typography>
              <IconButton aria-label="close" onClick={sidebarCloseHandler}>
                <CancelIcon />
              </IconButton>
            </Box>
          </ListItem>
          <Divider light />
          {res.map((category) => (
            <Link key={category} href={`/search?category=${category}`} passHref>
              <ListItem button component="a" onClick={sidebarCloseHandler}>
                <ListItemText primary={category}></ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
        <List>
          <ListItem>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Shopping by brend</Typography>
            </Box>
          </ListItem>
          <Divider light />
          {res2.map((category) => (
            <Link key={category} href={`/search?brend=${category}`} passHref>
              <ListItem button component="a" onClick={sidebarCloseHandler}>
                <ListItemText primary={category}></ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <div className="search">
        <Link href="/search">Shop</Link> <Link href="/cart">Cart</Link>
      </div>
      <div className="search">
        <form onSubmit={submitHandler}>
          <Box sx={classes.searchForm}>
            <InputBase
              name="query"
              sx={classes.searchInput}
              placeholder="Search products"
              onChange={queryChangeHandler}
            />
            <IconButton
              type="submit"
              sx={classes.searchButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </div>
      {userInfo ? (
        <div>
          <span>User:</span> <strong>{userInfo.name}</strong>
        </div>
      ) : (
        ""
      )}
      <div className="navbar_items flex">
        {/* <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch> */}
        <button onClick={darkModeChangeHandler}>
          {darkMode ? "Darck" : "White"}
        </button>
        <div className="menu_user">
          {userInfo ? (
            <>
              <Link href="/profile">Profile</Link>
              <div 
              onClick={logoutClickHandler}
              >Logout</div>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>

        <Link href="/cart">
          <div className="navbar_cart_item">
            <ShoppingCartIcon fontSize="large" />
            <div className="navbar_cart_num">{cartNum}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
