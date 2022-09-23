import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext,useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Layout } from "../componets";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";
import { Store } from "../utils/store";
import { getError } from "../utils/error";
import jsCookie from "js-cookie";

const Register = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      enqueueSnackbar(`${data.name} register success`, { variant: "success" });
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title="Register" description="описание Register">
      <Typography variant="h3" component="h3" style={{ textAlign: "center" }}>
        Register
      </Typography>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="form_wrap"
        style={{ width: "600px", margin: "0 auto" }}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="name"
              label="Name"
              inputProps={{ type: "name" }}
              error={Boolean(errors.name)}
              helperText={
                errors.name
                  ? errors.name.type === "minLength"
                    ? "Name is not valid"
                    : "Name is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === "pattern"
                    ? "Email is not valid"
                    : "Email is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              error={Boolean(errors.password)}
              helperText={
                errors.password
                  ? errors.password.type === "minLength"
                    ? "Password length is more then 5"
                    : "Password is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              className="cusom_class_fild"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: "password" }}
              error={Boolean(errors.confirmPassword)}
              helperText={
                errors.confirmPassword
                  ? errors.confirmPassword.type === "minLength"
                    ? "Confirm Password length is more then 5"
                    : "Confirm Password is required"
                  : ""
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
        <div className="">
          Not account{" "}
          <Link href={`/login?redirect=${redirect || "/"}`} passHref>
            <strong>Login</strong>
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
