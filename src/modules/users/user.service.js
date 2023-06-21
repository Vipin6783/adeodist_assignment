import UserDao from "../../daos/userDao";

class UserService {
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
}

export default new UserService();
