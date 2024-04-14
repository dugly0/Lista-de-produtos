import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form, Row, Col, Dropdown } from "react-bootstrap";
import "./assets/css/styles.css"

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
      <div>
        {/* Campos de filtro e ordenação */}
        <Form>
          <Row>
            <Col sm={6} md={3} className="mb-1">
              <Form.Group controlId="filterByName">
                <Form.Control
                  type="text"
                  placeholder="Filtrar por nome..."
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={3} className="mb-1">
              <Form.Group controlId="filterByCategory">
                <Form.Control
                  type="text"
                  placeholder="Filtrar por categoria..."
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={3} className="mb-1">
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-sort-by-priority"
                  className="dropdown-toggle-left"
                >
                  Ordenar por prioridade {sortPriority && `(${sortPriority})`}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-auto">
                  <Dropdown.Item onClick={() => setSortPriority("normal")}>
                    Normal
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortPriority("importante")}>
                    Importante
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>
      </div>
      <ul>
        {/* Renderiza os produtos filtrados e ordenados */}
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Categoria: {product.category},
            Preço de Compra: {product.purchasePrice}, Preço de Venda:{" "}
            {product.sellingPrice}, Estoque: {product.stock}
            <a onClick={() => onToggleFavorite(product.id)}>
              {product.favorite ? (
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#FFD43B" }}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon icon={faStar} size="lg" />
              )}
            </a>
            <FontAwesomeIcon
              icon={faTrashCan}
              size="lg"
              style={{ color: "#EE4266" }}
              onClick={() => onDelete(product.id)}
            >
              Excluir
            </FontAwesomeIcon>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
