import UserService from "./user.service";

class UserController {
  getUserList = async (req, res, next) => {
    try {
      const { userId, roleId } = req;
      const result = await UserService.getUserList(userId, roleId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
