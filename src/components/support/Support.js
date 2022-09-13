import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { notifyInfo } from "../../services/notifications";
import { validate } from "../../store/actions/auth.action";

const Support = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validate());
    if (user.validated === true) {
      console.log("chat");
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, [dispatch]);
  return (
    <div>
      {user.validated ? <h1>Hurra</h1> : <Navigate to="/autenticacion" />}
    </div>
  );
};

export default Support;
