import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CheckoutWizard, Layout } from "../componets";
import { urlFor } from "../utils/client";
import { Store } from "../utils/store";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import axios from "axios";
import dynamic from "next/dynamic";

const Placeorder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  console.log("cart", cart);
  const { country, city, fullName, postalCode, adress } = cart.shippingAddress;
  const { cartItems, paymentMethod, shippingAddress } = cart;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const itemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );

  const shippingPrice = itemsPrice > 20000 ? 0 : 100;
  const totalPrice = itemsPrice + shippingPrice;

  console.log("userInfo", userInfo);



  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      console.log('test111')
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((x) => ({
            ...x,
            countInStok: undefined,
            slug: undefined,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: "CART_CLEAR" });
      setLoading(false);
      router.push(`/order/${data}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

    useEffect(() => {
      if (!paymentMethod) {
        router.push("/payment");
      }
      if (cartItems.length === 0) {
        router.push("/cart");
      }
    }, [paymentMethod, cartItems, router]);

  return (
    <Layout title="Placeorder" description="описание Cart">
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <div className="title">Place Order</div>
      <div className="oder_item_wrap">
        <div className="ff">
          <div className="oder_item">
            <div className="oder_item_text">Shipping Address</div>
            <div className="oder_item_text2">
              Full Name : <span>{fullName}</span>
            </div>
            <div className="oder_item_text2">
              Country : <span>{country}</span>
            </div>
            <div className="oder_item_text2">
              City : <span>{city}</span>
            </div>
            <div className="oder_item_text2">
              Adress : <span>{adress}</span>
            </div>
            <div className="oder_item_text2">
              Postal Code : <span>{postalCode}</span>
            </div>
            <Button
              onClick={() => router.push("/shipping")}
              // variant="contained"
              color="primary"
              variant="outlined"
            >
              Edit
            </Button>
          </div>
          <div className="oder_item">
            <div className="oder_item_text">Payment Method</div>
            <div className="oder_item_text2">
              Payment Method : <span>{paymentMethod}</span>
            </div>

            <Button
              onClick={() => router.push("/payment")}
              // variant="contained"
              color="primary"
              variant="outlined"
            >
              Edit
            </Button>
          </div>
          <div className="oder_item">
            <div className="oder_item_text">Order Items</div>
            {cart.cartItems.map((item, i) => (
              <Link key={i} href={`/product/${item.slug}`}>
                <div className="oder_item_text2 oder_item_text_order">
                  <div className="ord ord_new">
                    <img
                      className="card_image"
                      src={item.image && urlFor(item.image[0])}
                      alt=""
                    />
                  </div>
                  <div className="ord ord_new">{item.name}</div>
                  <div className="ord">{item.quantity}</div>
                  <div className="ord">{item.price}</div>
                </div>
              </Link>
            ))}

            <Button
              onClick={() => router.push("/cart")}
              // variant="contained"
              color="primary"
              variant="outlined"
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="oder_item_subtotal oder_item">
          <div className="title">Order Summary:</div>
          <div className="item_subtotal dflex">
            <div className="item_subtotal">Items({cart.cartItems.length}):</div>
            <div className="item_subtotal">{itemsPrice}$</div>
          </div>
          <div className="item_subtotal dflex">
            <div className="item_subtotal">Shipping Price:</div>
            <div className="item_subtotal">{shippingPrice}$</div>
          </div>
          <div className="item_subtotal dflex">
            <div className="item_subtotal">Tota:</div>
            <div className="item_subtotal">{totalPrice}$</div>
          </div>
          <Button
            onClick={placeOrderHandler}
            style={{ marginTop: "10px" }}
            // variant="contained"
            color="primary"
            variant="outlined"
            // disabled={loading}
            fullWidth
          >
            Pay
          </Button>
          {loading  &&  <CircularProgress />}
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Placeorder), { ssr: false });
