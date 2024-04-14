import React, { useState } from "react";
import AddProductForm from "./addProductForm/AddProductForm";
import ProductList from "./ProductList";
import FavoriteProductList from "./FavoriteProductList";
import CategoryManagement from "./categoryManagement/CategoryManagement";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "./navbar";

// Componente principal que mantém o estado dos produtos e categorias

const ProductManagementApp = () => {
  const [products, setProducts] = useState([]); // Estado para os produtos
  const [categories, setCategories] = useState([
    "Frutas",
    "Leite",
    "Banheiro",
    "Frios",
    "Carnes",
  ]); // Estado para as categorias
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Estado para os produtos favoritos

  // Função para adicionar um novo produto à lista de produtos
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Função para alternar o status de favorito de um produto
  const handleToggleFavorite = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, favorite: !product.favorite };
      }
      return product;
    });
    setProducts(updatedProducts);

    const updatedFavoriteProducts = updatedProducts.filter(
      (product) => product.favorite
    );
    setFavoriteProducts(updatedFavoriteProducts);
  };

  // Função para excluir um produto da lista
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);

    const updatedFavoriteProducts = updatedProducts.filter(
      (product) => product.favorite
    );
    setFavoriteProducts(updatedFavoriteProducts);
  };

  // Função para adicionar uma nova categoria
  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // Função para excluir uma categoria
  const handleDeleteCategory = (categoryToDelete) => {
    const updatedProducts = products.filter(
      (product) => product.category !== categoryToDelete
    );
    setProducts(updatedProducts);

    const updatedFavoriteProducts = updatedProducts.filter(
      (product) => product.favorite
    );
    setFavoriteProducts(updatedFavoriteProducts);

    const updatedCategories = categories.filter(
      (category) => category !== categoryToDelete
    );
    setCategories(updatedCategories);
  };

  return (
    <div>
      <Navbar />
      <Container className="d-flex justify-content-center">
        <Row>
          <Col className="mt-4 m-12">
            <div>
              {" "}
              {/* Coluna para a lista de produtos */}
              <h1>Lista de Produtos</h1>
              {/* Aqui vai o conteúdo da lista de produtos */}
            </div>
            <Row>
              <Col>
                {/* Componente de formulário para visualizar Categorias */}
                <CategoryManagement
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
                {" "}
                {/* Componente de formulário para adicionar Produtos */}
                <AddProductForm
                  onAdd={handleAddProduct}
                  categories={categories}
                />
              </Col>
            </Row>

            <div className="mt-4">
              {/* Componente de lista de produtos */}
              <ProductList
                products={products}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteProduct}
              />
            </div>
            <div className="mb-4">
              {/* Componente de lista de produtos favoritos */}
              <FavoriteProductList favoriteProducts={favoriteProducts} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductManagementApp;
