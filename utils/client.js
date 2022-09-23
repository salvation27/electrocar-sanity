import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// import config from "./config";

export const client = sanityClient({
  // projectId: process.env.PROJECT_ID,
  projectId: "cmo70g9b",
  dataset: "production",
  apiVersion: "2022-08-21",
  ignoreBrowserTokenWarning: true,
  useCdn: true,
  token:
    "skVjVjpOdGtuOBWotYv8OQfa9k5IEwTBlL3m0oBWFxyn9h36L2SF1qzfpAaEDVr7D3HFDlEP3zyRIRwfraHpl72rHQslE4LB4D10MvqxYJWaNVOiYng0fam0n69gWcV5Nj0OrMEEu3ATMlm5Ar6dWunWW2bbSv2SNpLsT8znxs8CMWLY4qHV",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);


