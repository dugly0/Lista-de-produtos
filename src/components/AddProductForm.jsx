import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

// Componente do formulário de adição de produto
const AddProductForm = ({ onAdd, categories }) => {
  const [productName, setProductName] = useState(""); // Estado para o nome do produto
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para a categoria selecionada
  const [purchasePrice, setPurchasePrice] = useState(""); // Estado para o preço de compra
  const [sellingPrice, setSellingPrice] = useState(""); // Estado para o preço de venda
  const [stock, setStock] = useState(""); // Estado para o estoque
  const [priority, setPriority] = useState("normal"); // Estado para a prioridade

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica se todos os campos do formulário estão preenchidos
    if (
      !productName ||
      !selectedCategory ||
      !purchasePrice ||
      !sellingPrice ||
      !stock
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Cria um novo produto com os dados do formulário
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name: productName,
      category: selectedCategory,
      purchasePrice: parseFloat(purchasePrice),
      sellingPrice: parseFloat(sellingPrice),
      stock: parseInt(stock),
      favorite: false,
      priority: priority, // Define a prioridade do produto
    };
    // Chama a função de callback para adicionar o novo produto
    onAdd(newProduct);
    // Limpa os campos do formulário após a adição do produto
    setProductName("");
    setSelectedCategory("");
    setPurchasePrice("");
    setSellingPrice("");
    setStock("");
    setPriority("normal"); // Reinicia a prioridade para o valor padrão
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="input-container p-2 m-3">
        <div className="row">
          <div className="col-lg-2 mb-3">
            <label>
              Nome do Produto:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-lg-2 mb-3">
            <label>
              Categoria:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="">Selecionar...</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="row">
          
          <div className="col-lg-2 mb-3">
            <label>
              Preço de Compra:
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-lg-2 mb-3">
            <label>
              Preço de Venda:
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-lg-1 mb-3">
            <label>
              Estoque:
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-control"
              />
            </label>
          </div>
          <div className="col-lg-2 mb-3">
            <label>
              Prioridade:
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="normal">Normal</option>
                <option value="importante">Importante</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit" className="button btn btn-primary p-2">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
