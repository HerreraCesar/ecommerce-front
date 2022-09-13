import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { signin } from "../../store/actions/auth.action.js";

const Login = ({ handleSection }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(signin(email, password));
    } catch (err) {
      console.log(err);
    }
  };

  return user.validated ? (
    <Navigate to="/" />
  ) : (
    <div className="card">
      <h3>Login de usuario</h3>
      <form onSubmit={handleLogin} className="form">
        <label>Ingrese su email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Ingrese su contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" className="button" value="Ingresar" />
      </form>
      <button onClick={handleSection}>¿No tienes cuenta? Registrate</button>
    </div>
  );
};

export default Login;
