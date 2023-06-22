import UserDao from "../../daos/userDao";
import { ROLES } from "../../utils/appConstant";

class UserService {
  createUser = async (name, roleId, emailId, password) => {
    console.log("email ========================= ", email);
    if (!name || !roleId || !emailId || !password) {
      throw new Error("All fields are mandatory");
    }
    if (!Object.values(ROLES).includes(roleId)) {
      throw new Error("Invalid role id");
    }
    const userRef = await UserDao.create({
      name,
      role_id: roleId,
      email: emailId,
      password,
    });

    return { userId: userRef.id, message: "User create successfully" };
  };

  getUserList = async (userId, roleId) => {
    const userRef = await UserDao.findAll();
    const userRecord = [];
    userRef.map(({ id, name, emailId, password }) => {
      userRecord.push({
        userId: id,
        name,
        emailId,
        password,
      });
    });
    return userRecord;
  };

  updateUser = async ({ name, roleId, emailId, password, userId }) => {
    const userRef = await UserDao.findOne({ id: userId });
    if (!userRef) {
      throw new Error("Invalid user id");
    }
    const data = {};
    if (name) {
      data.name = name;
    }
    if (roleId) {
      if (!Object.values(ROLES).includes(roleId)) {
        throw new Error("Invalid role id");
      }
      data.role_id = roleId;
    }
    if (emailId) {
      data.email = emailId;
    }
    if (password) {
      data.password = password;
    }
    if (Object.keys(data).length < 1) {
      throw new Error("Invalid user update request");
    }

    await UserDao.update(data, { id: userId });

    return { message: "User updated successfully" };
  };

  deleteUser = async (userId) => {
    const userRef = await UserDao.findOne({ id: userId });

    if (!userRef) {
      throw new Error("Invalid user id");
    }
    await UserDao.destroy({ id: userId });

    return { message: "User deleted successfully" };
  };
}

export default new UserService();
