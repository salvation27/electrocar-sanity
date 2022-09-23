import React, { useContext, useEffect } from 'react'
import { Layout } from '../../componets';
import dynamic from "next/dynamic";
import { Alert, CircularProgress } from '@mui/material';
import { useReducer } from 'react';
import axios from 'axios';
import { getError } from '../../utils/error';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import { urlFor } from '../../utils/client';
import jsCookie from "js-cookie";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
}


const OrderPage = ({ params: { id: orderId } }) => {
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const router = useRouter()

  const { state:userInfo } = useContext(Store);


  useEffect(() => {
    jsCookie.remove("cartItems");
    if (!userInfo) {
      return router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        console.log('test111')
        console.log("orderId11111", orderId);
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.userInfo.token}` },
        });
console.log("test222");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrder();
  }, [orderId, router, userInfo]);

  console.log("orderItems4444", orderItems);

  return (
    // <Layout title={`Order ${orderId}`} description="описание Cart">
    <Layout title={`Order ${orderId}`} description="описание Cart">
      <div className="title">Order: {orderId}</div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <>
          <div className="oder_item_wrap">
            <div className="ff">
              <div className="oder_item">
                <div className="oder_item_text">Shipping Address</div>
                <div className="oder_item_text2">
                  Full Name : <span>{shippingAddress.fullName}</span>
                </div>
                <div className="oder_item_text2">
                  Country : <span>{shippingAddress.country}</span>
                </div>
                <div className="oder_item_text2">
                  City : <span>{shippingAddress.city}</span>
                </div>
                <div className="oder_item_text2">
                  Adress : <span>{shippingAddress.adress}</span>
                </div>
                <div className="oder_item_text2">
                  Postal Code : <span>{shippingAddress.postalCode}</span>
                </div>
                <div className="oder_item_text2">
                  Status :{" "}
                  {isDelivered ? (
                    <span className="green_status">{`delivered at ${deliveredAt}`}</span>
                  ) : (
                    <span className="red_status">{"not delivered"}</span>
                  )}
                </div>
              </div>
              <div className="oder_item">
                <div className="oder_item_text">Payment Method</div>
                <div className="oder_item_text2">
                  Payment Method : <span>{paymentMethod}</span>
                </div>
                <div className="oder_item_text2">
                  Status :{" "}
                  {isPaid ? (
                    <span className="green_status">{`paid at ${paidAt}`}</span>
                  ) : (
                    <span className="red_status">{"not paid"}</span>
                  )}
                </div>
              </div>
              <div className="oder_item">
                <div className="oder_item_text">Order Items</div>
                {orderItems.map((item, i) => (
                  <div key={i} className="oder_item_text2 oder_item_text_order">
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
                ))}
              </div>
            </div>
            <div className="oder_item_subtotal oder_item">
              <div className="title">Order Summary:</div>
              <div className="item_subtotal dflex">
                <div className="item_subtotal">Items({orderItems.length}):</div>
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
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default dynamic(() => Promise.resolve(OrderPage), { ssr: false });