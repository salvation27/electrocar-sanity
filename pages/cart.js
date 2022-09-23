import React, { useContext, useEffect, useState } from 'react'
import { EmptyCart, Layout, TypographyEl } from "../componets";
import { Store } from '../utils/store';
import axios from "axios";
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import Link from 'next/link';
import { urlFor } from '../utils/client';
// import getStripe from '../utils/getStripe';
const Cart = () => {
        const {
          state: {
            cart: { cartItems },
          },
          dispatch,
        } = useContext(Store);
  const [cartData,setCartData] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
// const router = useRouter()

    const updateCartHandler = async (item, quantity) => {
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
        return;
      }
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          _key: item._key,
          name: item.name,
          countInStok: item.countInStok,
          slug: item.slug,
          price: item.price,
          image: item.image,
          quantity,
        },
      });
      enqueueSnackbar(`${item.name} updated in the cart`, {
        variant: "success",
      });
    };

      const removeItemHandler = (item) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
        enqueueSnackbar(`${item.name} remove in the cart`, {
          variant: "success",
        });
      };
     
      useEffect(() => {
        setCartData(cartItems);
      }, [dispatch, cartItems]);


  //   const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartData),
  //   });

  //   if(response.statusCode === 500) return;
  //   const data = await response.json();
  //   stripe.redirectToCheckout({ sessionId: data.id });
  // }



// здесь в картинке не надо прописывать  import urlFor потому что бул передан  через кнопку

  return (
    <Layout title="Shoping cart" description="описание Cart">
      <TypographyEl teg="h1" classN="span">
        {cartData.length === 0 ? "" : "Cart"}
      </TypographyEl>
      {cartData.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart_wrap">
          <div className="cart_prod">
            {cartData.map((x) => (
              <div key={x._key} className="cart_item_wrap">
                <div className="cart_item_wrap_foto">
                  <Link href={`/product/${x.slug}`}>
                    <img
                      className="card_image"
                      src={urlFor(x.image[0])}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="cart_item_wrap_text">{x.name}</div>
                <div className="cart_item_wrap_text">
                  <Select
                    value={x.quantity}
                    onChange={(e) => updateCartHandler(x, e.target.value)}
                  >
                    {[...Array(x.countInStok).keys()].map((y) => (
                      <MenuItem key={y + 1} value={y + 1}>
                        {y + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="cart_item_wrap_text">{x.price}$</div>
                <div
                  className="cart_item_wrap_text remove_btn"
                  onClick={() => removeItemHandler(x)}
                >
                  X
                </div>
              </div>
            ))}
          </div>
          <div className="cart_check">
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem component="div">
                    <Typography variant="h6" component="div">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) :{"  "}
                      <br />
                      <strong style={{fontSize:'24px'}}>
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}{" "}
                        $
                      </strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={() => {
                        router.push("/shipping");
                      }}
                      // onClick={handleCheckout}
                      fullWidth
                      color="primary"
                      variant="contained"
                    >
                      Checkout
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Cart