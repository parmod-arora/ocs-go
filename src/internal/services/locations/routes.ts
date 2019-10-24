import { Request, Response } from "express";
import { getTips} from "./service";


export default [
  {
    path: "/tips",
    method: "post",
    handler: [
      async (req : Request, res: Response) => {
        const result = await getTips();
        res.status(200).send(result);
      }
    ]
  }
];