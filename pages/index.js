import { BestProducts, Categ, ProductItem, Sale, SliderMainPage, TypographyEl } from "../componets";
import Layout from "../componets/Layout";
import { useEffect, useState } from "react";
import {client} from "../utils/client";
import { Alert, CircularProgress } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleItem from "../componets/SaleItem";

export default function Home() {

  return (
    <Layout title="главная" description="описание Home">
      <div className="slider_block">
        <SliderMainPage />
        <SaleItem />
      </div>
      <Categ />
      <Sale />
      <BestProducts />
    </Layout>
  );
}
