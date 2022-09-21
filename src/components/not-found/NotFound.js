import { Link } from "react-router-dom";
import React from "react";
import gif from "../../assets/404.gif";

const NotFound = () => {
  return (
    <div className="notFound">
      <img className="gif" src={gif} alt="error" />
      <div className="container">
        <h1>Oops!</h1>
        <h2>404 Not Found</h2>
        <p>Lo sentimos, no se ha encontrado la página solicitada.</p>
        <div>
          <button className="button">
            <Link to="/">Llévame al inicio</Link>
          </button>
          <button className="button">
            <Link to="/soporte">Hablar con el soporte</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
