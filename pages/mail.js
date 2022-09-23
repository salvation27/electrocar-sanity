import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useSnackbar } from "notistack";

// https://www.youtube.com/watch?v=I4DKr1JLC50

const ContactUs = () => {
  const [test,setTest] = useState('')
  const form = useRef();
const { enqueueSnackbar } = useSnackbar();
  const sendEmail = (e) => {
    e.preventDefault();
setTest('1212121212')
    emailjs
      .sendForm(
        "service_nb7y9gd",
        "template_z1t2l6n",
        form.current,
        "9zUXdzZuWVJpv6kvn"
      )
      .then(
        (result) => {
          console.log(result.text);
          enqueueSnackbar(`Message sended`, { variant: "success" });
            console.log("form", form);
            console.log("test", test);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
console.log("test", test);
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <input
      className="inp_test"
        onChange={(e) => setTest(e.target.value)}
        value={test}
        name="user_test"
      />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};


export default ContactUs;