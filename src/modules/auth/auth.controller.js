import { TOKEN_HEADER_KEY } from "../../config";
import AuthService from "./auth.service";

class AuthController {
  login = async (req, res, next) => {
    try {
      const {
        body: { emailId, password },
      } = req;
      const result = await AuthService.login(
        emailId,
        password,
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  regenerateToken = async (req, res, next) => {
    try {
        const refreshToken = req.headers[TOKEN_HEADER_KEY];

      const result = await AuthService.regenerateToken(
        refreshToken
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new AuthController();
