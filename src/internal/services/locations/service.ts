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
    throw new ApplicationError(500, "sql-error ", "Unable to find tips")
  }
};

export const insertTipsKeys = async (keys: Array<string>) => {
  const tip = "Make conscious purchases"
  try {
    keys
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (! await IsItemExists(key)) {
        await query(`INSERT INTO tips ("item_key", "item_tips") values($1, $2)`, [key, tip])
      }
    }
  } catch (error) {
    throw new ApplicationError(500, "sql-error ", "Unable to find tips")
  }
}

export const IsItemExists = async (key: string) => {
  const rs = await query(`SELECT count(1) FROM tips where item_key = $1`, [key])
  return !!(rs.rows[0].count > 0)
}

