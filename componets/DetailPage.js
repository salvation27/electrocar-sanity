import React, { useContext } from "react";
import Link from "next/link";
import { urlFor } from "../utils/client";
import TypographyEl from "./elem/TypographyEl";
import { Button, Rating } from "@mui/material";
import { Store } from "../utils/store";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Slider } from "../componets";

const DetailPage = ({ product }) => {
  
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._key === product._id);
    console.log("existItem", existItem);
      if (existItem) {
        enqueueSnackbar("Sorry. Product already in cart", { variant: "error" });
        return;
      }
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStok < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStok: product.countInStok,
        slug: product.slug.current,
        price: product.price,
        image: product.image,
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    // router.push("/cart");
  };
  return (
    <div className="detail_wrap">
      <TypographyEl teg="h2" classN="span">
        <Link href="/"> 👈Back</Link>
      </TypographyEl>
      <div className="detail_item">
        <div className="detail_item_img">
          {/* <img
            className="card_image_detail"
            src={product.image && urlFor(product.image)}
            alt=""
          /> */}
          <Slider images={product.image} />
        </div>
        <div className="detail_item_text">
          <div className="detail_item_text_decr">
            <TypographyEl teg="h1" classN="span">
              {product.name}
            </TypographyEl>

            <TypographyEl teg="h4" classN="h6">
              Category: {product.category.name}
            </TypographyEl>

            {product.brend && (
              <TypographyEl teg="h4" classN="h6">
                Brend: {product.brend.name}
              </TypographyEl>
            )}

            {/* <TypographyEl teg="h4" classN="h6">
              Brand: {product.brend}
            </TypographyEl> */}
            <Rating value={product.rating} readOnly></Rating>
            {/* <div className="fff">{text[0].children[0].marks.text}</div> */}
          </div>
          <div className="detail_item_text_num">
            <TypographyEl teg="h4" classN="h5">
              Price {product.price}$
            </TypographyEl>
            <TypographyEl teg="h6" classN="h6">
              Status -
              {product.countInStok > 0 ? (
                <span className="green_text">in stock</span>
              ) : (
                <span className="red_text">out stock</span>
              )}
            </TypographyEl>
            <br />
            <Button
              size="large"
              fullWidth
              variant="contained"
              onClick={addToCartHandler}
            >
              Add Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="des">
        <div className="title">Description</div>
        <div className="des_title">{product.description}</div>
      </div>
    </div>
  );
};

export default DetailPage;
