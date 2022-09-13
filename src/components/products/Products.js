import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Item from "../item/Item";
import Loader from "../loader/Loader";
import { notifyInfo } from "../../services/notifications";
import productsService from "../../services/products";
import { validate } from "../../store/actions/auth.action";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(validate());
    if (user.validated === true) {
      const categories = []
      productsService.getProducts(user.token, category).then(
        (response) => {
          setProducts(response.data);
          response.data.forEach( product => {
            if (!categories.includes(product.category)) {
              categories.push(product.category)
            }
          });
          setCategories(categories)
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
      
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, [dispatch, category]);
  
  return (
    <div>
      {user.validated === true ? (
        isLoading ? (
          <Loader />
        ) : (
          <div>
            <ul className="categories">
            {categories.map((category) => (
                <Link to={`/productos/${category.toLowerCase()}`}>/ {category}</Link>
              ))}
              <Link to={'/productos'}>/ Volver</Link>
            </ul>
            <div className="list">
              {products.map((product) => (
                <Item product={product} key={product.id} />
              ))}
            </div>
          </div>
        )
      ) : (
        <Navigate to="/autenticacion" />
      )}
    </div>
  );
};

export default Products;
