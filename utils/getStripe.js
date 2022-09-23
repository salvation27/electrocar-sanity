import { loadStripe} from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LhCUmCVE1Tz9KxURNlrZNh3rQBecbCcESqBigkWJTA6bSDZycVCQSAwBwfYJUu13NyJaHBLgBeCfFZ180Dz5gIv00JAGioqVf"
    );
  }

  return stripePromise;
};

export default getStripe;
