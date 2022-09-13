import { notifyInfo } from "./notifications";

export const validateSession = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const now = Date.now();
  if (!user) {
    return false;
  } else if (now >= user.timestamp + 86400000) {
    localStorage.removeItem("user");
    notifyInfo("Su sesión ha expirado. Por favor vuelva a iniciar sesión.");
    return false;
  } else {
    return true;
  }
};
