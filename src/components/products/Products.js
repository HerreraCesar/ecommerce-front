import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Item from "../item/Item";
import Loader from "../loader/Loader";
import { Navigate } from "react-router-dom";
import { notifyInfo } from "../../services/notifications";
import productsService from "../../services/products";
import { validate } from "../../store/actions/auth.action";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true)
    dispatch(validate());
    if (user.validated === true) {
      productsService.getProducts(user.token).then(
        (response) => {
          setProducts(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
      setLoading(false)
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, [dispatch]);

  return (
    <div>
      {user.validated === true ? (
        isLoading ? (
          <Loader />
        ) : (
          <div className="list">
            {products.map((product) => (
              <Item product={product} key={product.id} />
            ))}
          </div>
        )
      ) : (
        <Navigate to="/autenticacion" />
      )}
    </div>
  );
};

export default Products;
