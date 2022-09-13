import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {notifyInfo} from '../../services/notifications';
import productsService from "../../services/products";
import { validate } from "../../store/actions/auth.action";

const Details = () => {
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(validate());
    if (user.validated === true) {
      productsService.getProduct(user.token, id).then(
        (response) => {
          setProduct(response.data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, [dispatch, id]);
  return (
    <div>
      <img className="photo" src={product.thumbnail} alt={product.title} />
      <h2 className="name">{product.title}</h2>
      <span className="price">$ {product.price}</span>
    </div>
  );
};

export default Details;
