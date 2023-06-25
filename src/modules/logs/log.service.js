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
    console.log("recentFile ====================== ", recentFile);

    if (recentFile) {
      const logData = await fs.readFileSync(
        LOG_SAVING_FOLDER_PATH + "/" + recentFile.file,
        "utf8"
      );
      // (err, data) => {
      //   console.log("data=========================", data);
      //   if (err) {
      //     console.log("==========================err", err);
      //     throw new Error("err");
      //   } else {
      //     console.log("data=========================", data);
      //     return data;
      //   }
      // }
      // );
      console.log("logData ============================= ", logData);
      return {logData};
    }
  };
}

export default new LogService();
