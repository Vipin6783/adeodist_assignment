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
}

export default new AppUtility();
