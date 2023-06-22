import UserService from "./user.service";

class UserController {
  createUser = async (req, res, next) => {
    try {
      const {body: {name, roleId, emailId, password} } = req;
      const result = await UserService.createUser(name, roleId, emailId, password);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getUserList = async (req, res, next) => {
    try {
      const { userId, roleId } = req;
      const result = await UserService.getUserList(userId, roleId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const {body: {name, roleId, emailId, password}, params: {userId} } = req;
      const result = await UserService.updateUser({name, roleId, emailId, password, userId});
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { params: {userId} } = req;
      const result = await UserService.deleteUser(userId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
