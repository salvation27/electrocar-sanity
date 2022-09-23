import React, { useContext, useEffect, useState } from "react";
import Navbar from './Navbar'
import Head from 'next/head'
import { Container } from '@mui/material'
import {Footer} from './index'
import { Store } from "../utils/store";
import Cookies from "js-cookie";


const Layout = ({children,title,description}) => {

  const [thema, setThema] = useState();
     const { state, dispatch } = useContext(Store);
     const { darkMode } = state;

       const darkModeChangeHandler = () => {
         dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
         const newDarkMode = !darkMode;
         Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
       };
  // console.log("Layout", darkMode);
  // console.log("Layout", thema);
  useEffect(() => {
    setThema(darkMode);
  }, [darkMode]);
  // console.log("thema", thema);
  return (
    <div className={`${thema ? "dark_bg" : ""}`}>
      <Head>
        <title>{title ? `${title} - Sanity Amazona` : "Sanity Amazona"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Navbar darkModeChangeHandler={darkModeChangeHandler} darkMode={thema} />
      <Container component="main">{children}</Container>
      <Footer />
    </div>
  );
}

export default Layout
