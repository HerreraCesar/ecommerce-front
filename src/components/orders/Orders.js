import { Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/Loader";
import { notifyInfo } from "../../services/notifications";
import ordersService from "../../services/orders";
import { validate } from "../../store/actions/auth.action";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(validate());
    if (user.validated === true) {
      ordersService.getOrders(user.token, user.email).then(
        (response) => {
          setOrders(response.data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, [dispatch]);
  return (
    <div>
      {user.validated ? (
        isLoading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="firstBuy">
            <h2>Todavía no realizaste ninguna compra.</h2>
            <h4>
              Agregá productos a tu carrito y realizá tu primera compra haciendo
              <Link to={"/productos"}> clic acá</Link>
            </h4>
          </div>
        ) : (
          <div className="ordersList">
            {orders.map((order) => (
              <div className="data" key={order.id}>
                <div>
                <h4>{new Date(order.timestamp).toLocaleString('es-AR')}</h4>
                <h3># {order.id}</h3>
                <h4>Productos: {order.cart[0].products.length}</h4>
                </div>
                
              <h3>TOTAL: <strong>${order.cart[0].total}</strong></h3>
              
              </div>
            ))}
          </div>
        )
      ) : (
        <Navigate to="/autenticacion" />
      )}
    </div>
  );
};

export default Orders;
