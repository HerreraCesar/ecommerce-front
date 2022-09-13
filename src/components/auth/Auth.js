import React, { useState } from "react";

import Login from "../login/Login";
import Registry from "../registration/Registry";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleSection = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="section">
      {isLogin ? (
        <Login handleSection={handleSection} />
      ) : (
        <Registry handleSection={handleSection} />
      )}
    </div>
  );
};

export default Auth;
