import ModulePermissionDao from "../daos/modulePermissionDao";
import UserFeedAccessMappingDao from "../daos/userFeedAccessMappingDao";
import { ROLES } from "../utils/appConstant";

const feedMiddleware = async (req, res, next) => {
  console.log("req ===================== ", req);

  const {
    userId,
    roleId,
    params: { feedId },
  } = req;

  const modulePermissions = await ModulePermissionDao.findOne({
    role_id: roleId,
  });
  console.log(
    "modulePermissions ============================ ",
    modulePermissions
  );

  req.feedPermissions = modulePermissions.permissions.feed;

  if (roleId != ROLES.SUPER_ADMIN && feedId) {
    const feedAccess = await UserFeedAccessMappingDao.findOne({
      user_id: userId,
      feed_id: feedId,
    });
    console.log("feedAccess ============================ ", feedAccess);

    if (!feedAccess) {
      throw new Error("You have not access for this feed");
    }
  }
};

export default feedMiddleware;
