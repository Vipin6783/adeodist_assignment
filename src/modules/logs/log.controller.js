import LogService from "./log.service";
class LogController {
  getLatestLogs = async (req, res, next) => {
    try {
      const { loggedInRoleId } = req;
      const result = await LogService.getLatestLogs(loggedInRoleId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new LogController();
