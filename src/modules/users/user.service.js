import UserDao from "../../daos/userDao";
import { PERMISSIONS, ROLES } from "../../utils/appConstant";

class UserService {
  createUser = async ({
    name,
    roleId,
    emailId,
    loggedInRoleId,
    modulePermissions,
  }) => {
    const userPermissions = modulePermissions.user;
    if (!userPermissions.includes(PERMISSIONS.CREATE)) {
      throw new Error("No permission to create users");
    }
    let password;

    if (!name || !roleId || !emailId) {
      throw new Error("All fields are mandatory");
    }
    if (![ROLES.ADMIN, ROLES.BASIC_USER].includes(roleId)) {
      throw new Error("Invalid role id");
    }
    if (roleId == ROLES.ADMIN) {
      password = "Admin123"; // we can generate password dynamically and send mail to user and save in encrypted form in db for security purpose
    } else {
      password = "User123"; // we can generate password dynamically and send mail to user and save in encrypted form in db for security purpose
    }

    if (roleId == loggedInRoleId) {
      throw new Error("Invalid Request to create user");
    } else if (loggedInRoleId == ROLES.ADMIN && roleId != ROLES.BASIC_USER) {
      throw new Error("Admin user can create basic users only");
    }

    const userDetail = await UserDao.findOne({ email: emailId });

    if (userDetail) {
      throw new Error("Email already exist. Please use different emailId");
    }
    const userRef = await UserDao.create({
      name,
      role_id: roleId,
      email: emailId,
      password,
    });

    return { userId: userRef.id, message: "User created successfully" };
  };

  getUserList = async (loggedInRoleId, modulePermissions) => {
    const userPermissions = modulePermissions.user;
    if (!userPermissions.includes(PERMISSIONS.READ)) {
      throw new Error("No permission to update users");
    }
    let userList;
    if (loggedInRoleId == ROLES.ADMIN) {
      userList = await UserDao.findAll({ role_id: ROLES.BASIC_USER });
    } else {
      userList = await UserDao.findAll({
        role_id: [ROLES.ADMIN, ROLES.BASIC_USER],
      });
    }
    const userRecord = [];
    userList.map(({ id, name, role_id, email }) => {
      userRecord.push({
        userId: id,
        name,
        emailId: email,
        roleId: role_id,
      });
    });
    return userRecord;
  };

  getUserDetail = async (userId, loggedInRoleId, modulePermissions) => {
    const userPermissions = modulePermissions.user;
    if (!userPermissions.includes(PERMISSIONS.READ)) {
      throw new Error("No permission to update users");
    }

    const userRef = await UserDao.findOne({ id: userId });
    if (!userRef) {
      throw new Error("Invalid user Id");
    }
    const { id, name, email, role_id } = userRef;
    if (role_id == loggedInRoleId) {
      throw new Error("User cannot fetch your detail");
    } else if (loggedInRoleId == ROLES.ADMIN && role_id != ROLES.BASIC_USER) {
      throw new Error(
        "Invalid request, Admin user can fetch the basic users detail only"
      );
    }
    return {
      userId: id,
      name,
      emailId: email,
      roleId: role_id,
    };
  };

  updateUser = async ({ name, roleId, emailId, userId, modulePermissions, loggedInRoleId }) => {
    console.log('emailId ====================== ', emailId);
    console.log('modulePermissions ====================== ', modulePermissions);

    const userPermissions = modulePermissions.user;
    if (!userPermissions.includes(PERMISSIONS.UPDATE)) {
      throw new Error("No permission to update users");
    }
    if (roleId == loggedInRoleId) {
      throw new Error("Invalid Request to update user");
    }
    console.log('userId ====================== ', userId);

    const userRef = await UserDao.findOne({ id: userId });
    console.log('userRef ====================== ', userRef);

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
    if (Object.keys(data).length < 1) {
      throw new Error("Invalid user update request");
    }
console.log('data, userId =========================== ', data, userId);
    await UserDao.update(data, { id: userId });

    return { message: "User updated successfully" };
  };

  deleteUser = async (userId, modulePermissions) => {
    const userPermissions = modulePermissions.user;
    if (!userPermissions.includes(PERMISSIONS.DELETE)) {
      throw new Error("No permission to update users");
    }
    const userRef = await UserDao.findOne({ id: userId });

    if (!userRef) {
      throw new Error("Invalid user id");
    }
    await UserDao.destroy({ id: userId });

    return { message: "User deleted successfully" };
  };
}

export default new UserService();
