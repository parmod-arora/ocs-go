import { query } from "../../platform/db";
import { ApplicationError } from "../../platform/web/error";

export const getTips = async (keys: Array<string>) => {
  try {
    let props = []
    for (let i = 1; i <= keys.length; i++) {
      props.push(`$${i}`)
    }
    const propquery = props.join(',')
    const rs = await query(`SELECT * FROM tips where item_key in (${propquery})`, [...keys])

    let output: any = {}
    rs.rows.map((row) => {
      if (output[row["item_key"]]) {
        output[row["item_key"]] = [
          ...output[row["item_key"]],
          row["item_tips"]
        ]
      } else {
        output[row["item_key"]] = [row["item_tips"]]
      }
    })
    return output
  } catch (error) {
    throw new ApplicationError(500, "invalid-location-id", "Unable to find location")
  }
};
