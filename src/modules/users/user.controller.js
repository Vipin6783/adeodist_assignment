import UserService from "./user.service";

class UserController {
  createUser = async (req, res, next) => {
    try {
      const {
        body: { name, roleId, emailId },
        loggedInRoleId,
        modulePermissions,
      } = req;
      const result = await UserService.createUser({
        name,
        roleId,
        emailId,
        loggedInRoleId,
        modulePermissions,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getUserList = async (req, res, next) => {
    try {
      const { loggedInRoleId, modulePermissions } = req;
      const result = await UserService.getUserList(
        loggedInRoleId,
        modulePermissions
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getUserDetail = async (req, res, next) => {
    try {
      const {
        params: { userId },
        loggedInRoleId,
        modulePermissions,
      } = req;
      const result = await UserService.getUserDetail(
        userId,
        loggedInRoleId,
        modulePermissions
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const {
        body: { name, roleId, emailId, modulePermissions },
        params: { userId },
      } = req;
      const result = await UserService.updateUser({
        name,
        roleId,
        emailId,
        userId,
        modulePermissions,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const {
        params: { userId },
        modulePermissions,
      } = req;
      const result = await UserService.deleteUser(userId, modulePermissions);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
