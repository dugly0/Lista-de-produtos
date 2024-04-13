import React, { useState, useMemo } from "react";

// Componente da lista de produtos
const ProductList = ({ products, onToggleFavorite, onDelete }) => {
  const [filterName, setFilterName] = useState(""); // Estado para filtrar por nome
  const [filterCategory, setFilterCategory] = useState(""); // Estado para filtrar por categoria
  const [sortPriority, setSortPriority] = useState(""); // Estado para a ordenação por prioridade

  // Memoriza os produtos filtrados para evitar cálculos repetidos
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(filterName.toLowerCase());
        const categoryMatch = product.category
          .toLowerCase()
          .includes(filterCategory.toLowerCase());
        return nameMatch && categoryMatch;
      })
      .filter((product) => {
        // Filtra por prioridade se houver
        if (sortPriority === "") {
          return true; // Retorna verdadeiro para todos os produtos se a prioridade não estiver definida
        } else {
          return product.priority === sortPriority;
        }
      });
  }, [products, filterName, filterCategory, sortPriority]); // Dependências para o useMemo

  // Função para ordenar os produtos por prioridade
  const sortedProducts = useMemo(() => {
    if (sortPriority === "") {
      return filteredProducts; // Retorna produtos filtrados se a prioridade não estiver definida
    } else {
      return [...filteredProducts].sort((a, b) => {
        if (a.priority === b.priority) {
          return 0;
        } else if (a.priority === "importante") {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }, [filteredProducts, sortPriority]);

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <div>
        {/* Campos de filtro e ordenação */}
        <input
          type="text"
          placeholder="Filtrar por nome..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por categoria..."
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <label>
          Ordenar por Prioridade:
          <select
            value={sortPriority}
            onChange={(e) => setSortPriority(e.target.value)}
          >
            <option value="">Nenhuma</option>
            <option value="normal">Normal</option>
            <option value="importante">Importante</option>
          </select>
        </label>
      </div>
      <ul>
        {/* Renderiza os produtos filtrados e ordenados */}
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Categoria: {product.category},
            Preço de Compra: {product.purchasePrice}, Preço de Venda:{" "}
            {product.sellingPrice}, Estoque: {product.stock}
            <button onClick={() => onToggleFavorite(product.id)}>
              {product.favorite ? "Desmarcar Favorito" : "Marcar como Favorito"}
            </button>
            <button onClick={() => onDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
