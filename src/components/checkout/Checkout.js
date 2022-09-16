import { Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { changeCart, validate } from "../../store/actions/auth.action";
import { notifyInfo, notifySuccess } from "../../services/notifications";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/Loader";
import { getProductsInCart } from "../../store/actions/cart.action";
import ordersService from "../../services/orders";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState();
  useEffect(() => {
    dispatch(validate());
    if (user.validated === true) {
      dispatch(getProductsInCart(user.token, user.cart, setLoading));
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, []);
  const confirmOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    ordersService.postOrder(user.token).then(
      (response) => {
        dispatch(changeCart(response.data.data.user, user.token));
        dispatch(getProductsInCart(user.token, user.cart, setLoading));
        setOrderData(response.data.data.order);
        setLoading(false);
        notifySuccess(response.data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return user.validated ? (
    isLoading ? (
      <Loader />
    ) : (
      <div className="purchase">
        {orderData ? (
          <div className="firstBuy">
            <h2>Se ha registrado correctamente su pedido</h2>
            <h4>
              Su número de órden es #<span>{orderData.id}</span>
            </h4>
            <h4>
              Para ver los detalles de sus compras haga
              <Link to={"/ordenes"}> clic acá</Link>.
            </h4>

            <h2>Su carrito está vacío.</h2>
            <h4>
              Agregue algunos productos haciendo
              <Link to={"/productos"}> clic acá</Link>
            </h4>
          </div>
        ) : cart.products.length === 0 ? (
          <Navigate to="/ordenes" />
        ) : (
          <form>
            <h2>Checkout</h2>
            <input
              onChange={""}
              type="text"
              name="name"
              required
              placeholder="nombre"
            ></input>
            <input
              onChange={""}
              type="tel"
              name="phone"
              required
              placeholder="teléfono"
            ></input>
            <input
              onChange={""}
              type="email"
              name="email"
              required
              placeholder="correo electrónico"
            ></input>
            <input
              onChange={""}
              type="email"
              name="emailVerification"
              required
              placeholder="confirme correo electrónico"
            ></input>
            <button
              type="submit"
              className="button"
              /* disabled={
                data.name === "" ||
                data.phone === "" ||
                data.email === "" ||
                data.email !== data.emailVerification
                  ? true
                  : false
              } */
              onClick={confirmOrder}
            >
              Comprar
            </button>
          </form>
        )}
      </div>
    )
  ) : (
    <Navigate to="/autenticacion" />
  );
};

export default Checkout;
