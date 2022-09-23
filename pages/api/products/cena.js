import nc from "next-connect";
import { client } from "../../../utils/client";

const handler = nc();

handler.get(async (req, res) => {
  // const categories = ["Shirts", "Pants"];
  const cena = await client.fetch(`*[_type == "prices"]{name,value}`);
//   console.log('123456',cena);
  res.send(cena);
});
export default handler;
