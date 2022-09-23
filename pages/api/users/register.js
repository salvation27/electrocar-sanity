import nc from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
// import config from "../../../utils/config";
import { signToken } from "../../../utils/auth";
import {client} from "../../../utils/client";

const handler = nc();

handler.post(async (req, res) => {
  const projectId = "cmo70g9b";
  const dataset = "production";
  const tokenWithWriteAccess =
    "skVjVjpOdGtuOBWotYv8OQfa9k5IEwTBlL3m0oBWFxyn9h36L2SF1qzfpAaEDVr7D3HFDlEP3zyRIRwfraHpl72rHQslE4LB4D10MvqxYJWaNVOiYng0fam0n69gWcV5Nj0OrMEEu3ATMlm5Ar6dWunWW2bbSv2SNpLsT8znxs8CMWLY4qHV";
  const createMutations = [
    {
      create: {
        _type: "user",
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ];
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existUser) {
    return res.status(401).send({ message: "Email aleardy exists" });
  }
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };
  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
