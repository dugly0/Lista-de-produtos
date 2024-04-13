import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";
import FavoriteProductList from "./FavoriteProductList";
import CategoryManagement from "./CategoryManagement";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "./navbar";

// Componente principal que mantém o estado dos produtos e categorias

const ProductManagementApp = () => {
  const [products, setProducts] = useState([]); // Estado para os produtos
  const [categories, setCategories] = useState(["Frutas","Leite","Banheiro","Frios","Carnes"]); // Estado para as categorias
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
      <Container fluid>
        <Row>
          <Col xs={4} md={2} className="border-end">

              <CategoryManagement
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </Col>
          <Col>
          <h1>Adicionar Produtos</h1>
                {/* Componente de formulário para adicionar produtos */}
                <AddProductForm
                  onAdd={handleAddProduct}
                  categories={categories}
                />
                {/* Componente de lista de produtos */}
                <ProductList
                  products={products}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteProduct}
                />
            {/* Componente de lista de produtos favoritos */}
            <FavoriteProductList favoriteProducts={favoriteProducts} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductManagementApp;
