import fs from "fs";
import path from "path";
class AppUtility {
  parseJwt = (token) => {
    var base64Content = token.split(".")[1];
    if (base64Content) {
      var base64 = base64Content.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
    return null;
  };

  getMostRecentFile = (dir) => {
    const files = this.orderRecentFiles(dir);
    return files.length ? files[0] : undefined;
  };

  orderRecentFiles = (dir) => {
    return fs
      .readdirSync(dir)
      .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
      .map((file) => ({
        file,
        mtime: fs.lstatSync(path.join(dir, file)).mtime,
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  };
}

export default new AppUtility();
