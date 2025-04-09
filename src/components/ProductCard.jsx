import React from "react";
import { Card, Rate, Button } from "antd";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{ height: 200, objectFit: "contain" }}
        />
      }
    >
      <Card.Meta title={product.title} description={product.category} />
      <p style={{ marginTop: 10 }}>
        <strong>${product.price}</strong>
      </p>
      <Rate
        disabled
        defaultValue={Math.round(product.rating?.rate || 0)}
        style={{ fontSize: 14 }}
      />
      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        <Button type="primary">Buy now</Button>
        <Button>Add to cart</Button>
      </div>
    </Card>
  );
};

export default ProductCard;
