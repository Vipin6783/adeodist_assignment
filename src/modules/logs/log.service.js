import { ROLES } from "../../utils/appConstant";
import fs from "fs";
import AppUtility from "../../utils/appUtility";
import { LOG_SAVING_FOLDER_PATH } from "../../config";
class LogService {
  getLatestLogs = async (loggedInRoleId) => {
    if (loggedInRoleId != ROLES.SUPER_ADMIN) {
      throw new Error("No access to read logs");
    }

    const recentFile = AppUtility.getMostRecentFile(LOG_SAVING_FOLDER_PATH);

    if (recentFile) {
      const logData = await fs.readFileSync(
        LOG_SAVING_FOLDER_PATH + "/" + recentFile.file,
        "utf8"
      );
      return { logData };
    }
  };
}

export default new LogService();
