import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, TOKEN_HEADER_KEY } from "../config";
import ModulePermissionDao from "../daos/modulePermissionDao";
import AppUtility from "../utils/appUtility";
import logger from "../utils/logger";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers[TOKEN_HEADER_KEY]?.split(" ")[1];
    if (!token) {
      next(new Error("Token not found"));
    }

    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    if (verified) {
      const decodedToken = AppUtility.parseJwt(token);
      const modulePermissions = await ModulePermissionDao.findOne({
        role_id: decodedToken.roleId,
      });

      req.loggedInUserId = decodedToken.userId;
      req.loggedInRoleId = decodedToken.roleId;
      req.modulePermissions = modulePermissions.permissions;
      next();
    } else {
      next(new Error("Invalid token"));
    }
  } catch (error) {
    logger.log("error=============", error)
    next(new Error("Invalid token"));
  }
};

export default authMiddleware;
