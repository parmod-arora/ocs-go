import { Request, Response } from "express";
import { getTips} from "./service";


export default [
  {
    path: "/tips",
    method: "post",
    handler: [
      async (req : Request, res: Response) => {
        const keys = req.body.key
        const result = await getTips(keys);
        res.status(200).send(result);
      }
    ]
  }
];