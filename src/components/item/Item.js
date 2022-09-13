import { Link } from "react-router-dom";
import React from "react";

const Item = ({ product }) => {
  return (
    <Link className="product" to={`/productos/details/${product.id}`}>
      <img className="photo" src={product.thumbnail} alt={product.title} />
      <h2 className="name">{product.title}</h2>
      <span className="price">$ {product.price}</span>
    </Link>
  );
};

export default Item;
