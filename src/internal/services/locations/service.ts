import { query } from "../../platform/db";
import { ApplicationError } from "../../platform/web/error";

export const getTips = async () => {
  try {
    const rs = await query("SELECT id, address, lat, lng FROM locations ORDER BY id")
    return rs.rows
  } catch (error) {
    throw new ApplicationError(500, "invalid-location-id", "Unable to find location")
  }
};

// export const deleteLocation = async (id: any) => {
//   try {
//     const flag = await isLocationExists(id)
//     if (flag) {
//       await query("DELETE FROM locations WHERE id = $1", [id])
//     } else {
//       throw new ApplicationError(400, "invalid-location-id", "Unable to find location")
//     }
//   } catch (error) {
//     throw error
//   }
// };
