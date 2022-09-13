import { Link } from "react-router-dom";
import React from "react";

const Menu = ({ open, handleMenu }) => {
  return (
    <div className={open === true ? "modal active" : "modal"}>
      <div className="links">
        <Link onClick={handleMenu} to="/productos">
          Productos
        </Link>
        <Link onClick={handleMenu} to="/ordenes">
          Órdenes
        </Link>
        <Link onClick={handleMenu} to="/carrito">
          Carrito
        </Link>
        <Link onClick={handleMenu} to="/soporte">
          Soporte
        </Link>
      </div>
    </div>
  );
};

export default Menu;
