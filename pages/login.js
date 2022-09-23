import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React,{useContext, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import { Layout } from "../componets";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import axios from "axios";
import { useRouter } from "next/router";
import { Store } from "../utils/store";
import jsCookie from "js-cookie";

const Login = () => {
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  
  const { enqueueSnackbar } = useSnackbar();
  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      enqueueSnackbar(`${data.name} login success`, { variant: "success" });
      router.push(redirect || "/search");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);


  return (
    <Layout title="Login" description="описание Login">
      <Typography variant="h3" component="h3" style={{ textAlign: "center" }}>
        Login
      </Typography>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="form_wrap"
        style={{ width: "600px", margin: "0 auto" }}
      >
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
        <Button type="submit" fullWidth variant="contained">
          Login
        </Button>
        <div className="">
          Not account{" "}
          <Link href={`/register?redirect=${redirect || '/' }`} passHref>
            <strong>Register</strong>
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
