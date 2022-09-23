import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout, ProductItem } from "../componets";
import { client } from "../utils/client";

import classes from "../utils/classes";



export default function SearchScreen() {
  const router = useRouter();
  const {
    category = "all",
    brend = "all",
    query = "all",
    price = "all",
    rating = "all",
    sort = "default",
  } = router.query;
  const [state, setState] = useState({
    categories: [],
    brends: [],
    products: [],
    error: "",
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useState([]);
  const [brends, setBrends] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState([1, 20000]);
  const [filterData, setFilterData] = useState([]);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();

    const fetchBrend = async () => {
      try {
        const { data } = await axios.get(`/api/products/brend`);
        setBrends(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBrend();

    const fetchData = async () => {
      try {
        let gQuery = '*[_type == "product" ';
        if (category !== "all") {
          gQuery += ` && category._ref in *[_type=="category" && name=="${category}"]._id  `;
        }

        if (brend !== "all") {
          gQuery += ` && brend._ref in *[_type=="brend" && name=="${brend}"]._id  `;
        }

        if (query !== "all") {
          gQuery += ` && name match "${query}" `;
        }
        if (price !== "all") {
          const minPrice = Number(price.split("-")[0]);
          const maxPrice = Number(price.split("-")[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }
        if (rating !== "all") {
          gQuery += ` && rating >= ${Number(rating)} `;
        }
        let order = "";
        if (sort !== "default") {
          if (sort === "lowest") order = "| order(price asc)";
          if (sort === "highest") order = "| order(price desc)";
          if (sort === "toprated") order = "| order(rating desc)";
        }

        gQuery += ` ] ${order}`;

        // console.log("gQuery", gQuery);

        setState({ loading: true });

        const products = await client.fetch(gQuery);

        setState({ products, loading: false });

        // для фильтрации слайдером цен
        const numArr = products.map((x) => x.price);
        const maxRange = getMaxOfArray(numArr);
        const minRange = getMinOfArray(numArr);
        setSelectedPrice([minRange - 5, maxRange + 5]);

        setFilterData(products);
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchData();
  }, [category, price, query, rating, sort, brend]);

  const filterSearch = ({
    category,
    sort,
    searchQuery,
    price,
    rating,
    brend,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (brend) query.brend = brend;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };

  const brendHandler = (e) => {
    filterSearch({ brend: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };

  // обнуление категории
  const categoryHandlerRemove = () => {
    filterSearch({ category: "all" });
  };

  const priceHandlerRemove = () => {
    filterSearch({ price: "all" });
  };

  useEffect(() => {
    filterRange();
  }, [selectedPrice]);

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
  }

  const filterRange = () => {
    const list = products;

    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    const res = list.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
    setFilterData(res);
  };



  return (
    <Layout title="search">
      <Grid sx={classes.section} container spacing={2}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category.name} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography>Brend</Typography>
                <Select fullWidth value={brend} onChange={brendHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {brends &&
                    brends.map((brend) => (
                      <MenuItem key={brend.name} value={brend.name}>
                        {brend.name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            {/* <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography>Prices</Typography>
                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem> */}

            <ListItem className="mt-15">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={selectedPrice}
                onChange={handleChangePrice}
                min={0}
                max={20000}
                // valueLabelDisplay="true"
                valueLabelDisplay="on"
              />
            </ListItem>
            {category !== "all" && category !== "" && " category : " + category}
            {category !== "all" && category !== "" ? (
              <Button onClick={categoryHandlerRemove} color="error">
                X
              </Button>
            ) : null}
            <br />
            {price !== "all" && " Price " + price}
            {price !== "all" ? (
              <Button color="error" onClick={priceHandlerRemove}>
                X
              </Button>
            ) : null}
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products && products.length !== 0 ? products.length : "No"}{" "}
              Results
              {category !== "all" &&
                category !== "" &&
                " category : " + category}
              {query !== "all" && query !== "" && " : " + query}
              {price !== "all" && " : Price " + price}
              {rating !== "all" && " : Rating " + rating + " & up"}
              {(category !== "all" && category !== "") ||
              (query !== "all" && query !== "") ||
              rating !== "all" ||
              price !== "all" ? (
                <Button onClick={() => router.push("/search")}>
                  All filter close X
                </Button>
              ) : null}
            </Grid>

            <Grid item>
              <Typography component="span" sx={classes.sort}>
                Sort by
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Customer Reviews</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid sx={classes.section} container spacing={3}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert>{error}</Alert>
            ) : (
              <Grid container spacing={3}>
                {filterData.map((product) => (
                  <Grid item md={4} key={product.name}>
                    <ProductItem item={product} />
                  </Grid>
                ))}
              </Grid> 
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
