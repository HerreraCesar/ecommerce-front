import { Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  clearCart,
  getProductsInCart,
  removeProductFromCart,
} from "../../store/actions/cart.action";
import { useDispatch, useSelector } from "react-redux";

import { FiTrash2 } from "react-icons/fi";
import Loader from "../loader/Loader";
import { notifyInfo } from "../../services/notifications";
import { validate } from "../../store/actions/auth.action";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(validate());
    if (user.validated === true) {
      dispatch(getProductsInCart(user.token, user.cart, setLoading));
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, []);
  const removeProduct = async (product) => {
    setLoading(true);
    dispatch(
      removeProductFromCart(user.token, user.cart, product.id, setLoading)
    );
  };
  const emptyCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(clearCart(user.token, user.cart, setLoading));
  };
  return (
    <div>
      {user.validated ? (
        isLoading ? (
          <Loader />
        ) : cart.products.length === 0 ? (
          <div className="firstBuy">
            <h2>Su carrito está vacío.</h2>
            <h4>
              Agregue algunos productos haciendo
              <Link to={"/productos"}> clic acá</Link>
            </h4>
          </div>
        ) : (
          <div className="cartContainer">
            <div className="cartCards">
              {cart.products.map((product) => (
                <div key={product.id} className="cartCard">
                  <div className="resume">
                    <img
                      className="photo"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <Link to={`/productos/detalles/${product.id}`}>
                      {product.title}
                    </Link>
                    <p>$ {product.price}</p>
                  </div>
                  <div
                    className="delete"
                    onClick={() => {
                      removeProduct(product);
                    }}
                  >
                    <FiTrash2 />
                  </div>
                </div>
              ))}
            </div>
            <div className="total">
              <div className="amount">
                <h1>El total de su compra es</h1>
                <h1>$ {cart.total}</h1>
              </div>
              <div className="buttons">
                <button className="button" onClick={emptyCart}>
                  Vaciar carrito
                </button>
                <button className="button">
                  <Link to="/checkout">Terminar compra</Link>
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        <Navigate to="/autenticacion" />
      )}
    </div>
  );
};

export default Cart;
