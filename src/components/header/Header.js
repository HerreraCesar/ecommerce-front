import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu from "../menu/Menu";
import { signout } from "../../store/actions/auth.action";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      dispatch(signout()).then(navigate("/"));
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  return (
    <div className="header">
      <div className="navbar">
        <div className="sections">
          <button onClick={handleMenu}>
            Sections {open === true ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <div className="logo">
          <Link to="/" onClick={() => setOpen(false)}>
            Mi tienda
          </Link>
        </div>
        <div className="icons">
          {user.validated === true ? (
            <Link to="/#" onClick={handleLogout}>
              Cerrar sesión
            </Link>
          ) : (
            <Link to="/autenticacion" onClick={() => setOpen(false)}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
      <Menu open={open} handleMenu={handleMenu} />
    </div>
  );
};

export default Header;
