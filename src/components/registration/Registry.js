import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/Loader";
import { Navigate } from "react-router-dom";
import { signup } from "../../store/actions/auth.action";

const Registry = ({ handleSection }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleRegistry = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(signup(email, password, username, phone, setLoading));
  };

  return isLoading ? (
    <Loader />
  ) : user.validated ? (
    <Navigate to="/" />
  ) : (
    <div className="card">
      <h3>Registro de usuario</h3>
      <form onSubmit={handleRegistry} className="form">
        <label>Ingrese su nombre:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Ingrese su celular:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label>Ingrese su correo electrónico:</label>
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
        <input type="submit" className="button" value="Registrar" />
      </form>
      <button onClick={handleSection}>¿Ya tienes cuenta? Inicia sesión</button>
    </div>
  );
};

export default Registry;
