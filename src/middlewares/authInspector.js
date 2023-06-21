import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, TOKEN_HEADER_KEY } from "../config";
import AppUtility from "../utils/appUtility";

class AuthInspector {
  validateToken = async (req, res, next) => {
    try {
      const token = req.headers[TOKEN_HEADER_KEY];

      if (!token) {
        throw new Error("Token not found");
      }
      const verified = jwt.verify(token, JWT_SECRET_KEY);
      if (verified) {
        const decodedToken = AppUtility.parseJwt(token);
        req.userId = decodedToken.userId;
        req.roleId = decodedToken.roleId;
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      throw new Error("Invalid token");
    }
  };
}
export default new AuthInspector();
