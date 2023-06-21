import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRY_IN_MIN,
  REFRESH_TOKEN_EXPIRY_IN_MIN,
} from "../../config";
import UserDao from "../../daos/userDao";
import AppUtility from "../../utils/appUtility";

class AuthService {
  login = async (emailId, password) => {
    const userRef = await UserDao.findOne({ email: emailId });
    if (!userRef || userRef.password != password) {
      throw new Error("Either email or password is invalid");
    }

    return this.getAccessAndRefreshToken(userRef);
  };

  regenerateToken = async (refreshToken) => {
    const verified = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);

    if (!verified) {
      throw new Error("Invalid refresh token");
    }
    const decodedToken = AppUtility.parseJwt(token);
  
    const userRef = await UserDao.findOne({
      id: decodedToken.userId,
      role_id: decodedToken.roleId,
    });
    if (!userRef) {
        throw new Error("Invalid refresh token");
    }

    return this.getAccessAndRefreshToken(userRef);
  };

  getAccessAndRefreshToken = async (userRef) => {
    const data = {
      time: Date(),
      userId: userRef.id,
      roleId: userRef.role_id,
    };

    const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY_IN_MIN,
    });
    const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY_IN_MIN,
    });

    return { accessToken, refreshToken };
  };
}

export default new AuthService();
