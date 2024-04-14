import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form } from "react-bootstrap";
import "./assets/css/styles.css";

// Componente do formulário de adição de produto
const AddProductForm = ({ onAdd, categories }) => {
  const [show, setShow] = useState(false); // Estado para controlar a exibição do modal
  const [productName, setProductName] = useState(""); // Estado para o nome do produto
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para a categoria selecionada
  const [purchasePrice, setPurchasePrice] = useState(""); // Estado para o preço de compra
  const [sellingPrice, setSellingPrice] = useState(""); // Estado para o preço de venda
  const [stock, setStock] = useState(""); // Estado para o estoque
  const [priority, setPriority] = useState("normal"); // Estado para a prioridade

  const handleClose = () => setShow(false); // Função para fechar o modal
  const handleShow = () => setShow(true); // Função para abrir o modal

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
    setShow(false); // Fecha o modal após o envio do formulário
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="button">
        Adicionar Produto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Grupo 1: Nome do Produto e Categoria */}
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Nome do Produto:</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Digite o nome do produto"
                className="custom-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Categoria:</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Selecione a categoria"
                className="custom-select"
              >
                <option value="">Selecionar...</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Grupo 2: Preço de Compra, Preço de Venda e Estoque */}
            <Form.Group className="mb-3" controlId="purchasePrice">
              <Form.Label>Preço de Compra:</Form.Label>
              <Form.Control
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="Digite o preço de compra"
                className="custom-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sellingPrice">
              <Form.Label>Preço de Venda:</Form.Label>
              <Form.Control
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="Digite o preço de venda"
                className="custom-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Estoque:</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Digite o estoque disponível"
                className="custom-input"
              />
            </Form.Group>

            {/* Grupo 3: Prioridade */}
            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Prioridade:</Form.Label>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                aria-label="Selecione a prioridade"
                className="custom-select"
              >
                <option value="normal">Normal</option>
                <option value="importante">Importante</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" type="submit" onClick={handleSubmit} className="button">
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductForm;
