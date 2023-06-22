import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, TOKEN_HEADER_KEY } from "../config";
import AppUtility from "../utils/appUtility";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers[TOKEN_HEADER_KEY];
    if (!token) {
      throw new Error("Token not found");
    }
    console.log('token ======================== ', token);

    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    console.log('verified ======================== ', verified);

    if (verified) {
      const decodedToken = AppUtility.parseJwt(token);
      req.loggedInUserId = decodedToken.userId;
      req.loggedInRoleId = decodedToken.roleId;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default authMiddleware;
