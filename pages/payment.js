import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { CheckoutWizard, Layout } from "../componets";
import jsCookie from "js-cookie";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Store } from "../utils/store";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.adress) {
      router.push("/shipping");
    } else {
      setPaymentMethod(jsCookie.get("paymentMethod") || "");
    }
  }, [router, shippingAddress]);



    const submitHandler = (e) => {
      e.preventDefault();
      if (!paymentMethod) {
        enqueueSnackbar("Payment method is required", { variant: "error" });
      } else {
        dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
        jsCookie.set("paymentMethod", paymentMethod);
        router.push("/placeorder");
      }
    };
  return (
    <Layout title="Payment Method" description="описание Cart">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form onSubmit={submitHandler}>
        <div className="title">Payment Method</div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Payment Method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              label="PayPal"
              value="PayPal"
              control={<Radio />}
            ></FormControlLabel>
            <FormControlLabel
              label="Stripe"
              value="Stripe"
              control={<Radio />}
            ></FormControlLabel>
            <FormControlLabel
              label="Cash"
              value="Cash"
              control={<Radio />}
            ></FormControlLabel>
          </RadioGroup>
        </FormControl>
        <div className="btm_pay_wrap">
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => router.push("/shipping")}
          >
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Payment;
