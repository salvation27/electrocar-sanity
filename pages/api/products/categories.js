import nc from "next-connect";
import { client } from "../../../utils/client";

const handler = nc();

handler.get(async (req, res) => {
  // const categories = ["Shirts", "Pants"];
  const categ = await client.fetch(`*[_type == "category"]{name}`);
  res.send(categ);
});
export default handler;
