import React, { useContext, useEffect } from "react";
import { CheckoutWizard, Layout } from "../componets";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Store } from "../utils/store";
import jsCookie from "js-cookie";
import { useSnackbar } from "notistack";

const Shipping = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);


  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      enqueueSnackbar(`You need login first`, { variant: "error" });
      return router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("adress", shippingAddress.adress);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [router, userInfo, setValue, shippingAddress]);

  const submitHandler = ({ fullName, adress, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, adress, city, postalCode, country },
    });
    jsCookie.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        adress,
        city,
        postalCode,
        country,
      })
    );
    router.push("/payment");
  };
  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="title">Shipping Adress</div>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 5,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="fullName"
              label="Full Name"
              inputProps={{ type: "fullName" }}
              error={Boolean(errors.fullName)}
              helperText={
                errors.fullName
                  ? errors.fullName.type === "minLength"
                    ? "Full Name length is more than 5"
                    : "Full Name is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="adress"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="adress"
              label="Adress"
              inputProps={{ type: "adress" }}
              error={Boolean(errors.adress)}
              helperText={
                errors.adress
                  ? errors.adress.type === "minLength"
                    ? "Adress length is more than 2"
                    : "Adress is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 5,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="city"
              label="City"
              inputProps={{ type: "city" }}
              error={Boolean(errors.city)}
              helperText={
                errors.city
                  ? errors.city.type === "minLength"
                    ? "City length is more than 5"
                    : "City is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="postalCode"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 5,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="postalCode"
              label="Postal Code"
              inputProps={{ type: "postalCode" }}
              error={Boolean(errors.postalCode)}
              helperText={
                errors.postalCode
                  ? errors.postalCode.type === "minLength"
                    ? "Postal Code length is more than 5"
                    : "Postal Code is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="country"
              label="Country"
              inputProps={{ type: "country" }}
              error={Boolean(errors.country)}
              helperText={
                errors.country
                  ? errors.country.type === "minLength"
                    ? "Country length is more than 2"
                    : "Country is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Button type="submit" variant="contained">
          Next step
        </Button>
      </form>
    </Layout>
  );
};

export default Shipping;
