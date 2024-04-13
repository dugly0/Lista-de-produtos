import React from "react";

// Componente da lista de produtos favoritos
const FavoriteProductList = ({ favoriteProducts }) => {
  return (
    <div>
      <h2>Produtos Favoritos</h2>
      <ul>
        {favoriteProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Categoria: {product.category},
            Preço de Compra: {product.purchasePrice}, Preço de Venda:{" "}
            {product.sellingPrice}, Estoque: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteProductList;
