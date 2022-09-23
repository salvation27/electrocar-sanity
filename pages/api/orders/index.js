import axios from "axios";
import nc from "next-connect";
import { isAuth} from "../../../utils/auth";

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  const projectId = "cmo70g9b";
  const dataset = "production";
  const tokenWithWriteAccess =
    "skVjVjpOdGtuOBWotYv8OQfa9k5IEwTBlL3m0oBWFxyn9h36L2SF1qzfpAaEDVr7D3HFDlEP3zyRIRwfraHpl72rHQslE4LB4D10MvqxYJWaNVOiYng0fam0n69gWcV5Nj0OrMEEu3ATMlm5Ar6dWunWW2bbSv2SNpLsT8znxs8CMWLY4qHV";
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: [
        {
          create: {
            _type: "order",
            createdAt: new Date().toISOString(),
            ...req.body,
            userName: req.user.name,
            user: {
              _type: "reference",
              _ref: req.user._id,
            },
          },
        },
      ],
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  res.status(201).send(data.results[0].id);
});
export default handler;
