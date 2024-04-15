import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CategoryModal = ({
  categories,
  onDeleteCategory,
  handleAddCategory,
  onHide,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [mostrarInput, setMostrarInput] = useState(false);
  const [show, setShow] = useState(false); // Estado para controlar a exibição do modal

  const handleClose = () => {
    setShow(false); // Fechar o modal
    setMostrarInput(false);
    onHide();
  };
  

  const handleConfirmAddCategory = () => {
    if (newCategory.trim() !== "") {
      handleAddCategory(newCategory);
      setNewCategory("");
      setMostrarInput(false);
    }
  };

  const handleDeleteCategory = (category) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a categoria "${category}"?`);
    if (confirmDelete) {
      onDeleteCategory(category);
    }
  };

  const handleShow = () => {
    setShow(true); // Mostrar o modal
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="button">
        Categorias
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Categorias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ul style={{ listStyleType: "none" }}>
              {categories.map((category, index) => (
                <li key={index}>
                  - {category}
                  <FontAwesomeIcon
                    className="xmark"
                    style={{ cursor: "pointer" }}
                    icon={faXmark}
                    onClick={() => handleDeleteCategory(category)}
                  />{" "}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {mostrarInput ? (
              <div>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button className="bt mt-1" onClick={handleConfirmAddCategory}>
                  Criar
                </button>
              </div>
            ) : (
              <u
                style={{ cursor: "pointer" }}
                onClick={() => setMostrarInput(true)}
              >
                + Criar nova categoria
              </u>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const CategoryManagement = ({
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [showModal, setShowModal] = useState(false); // Inicializa o estado do modal como fechado

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <CategoryModal
      show={showModal}
      categories={categories}
      onDeleteCategory={onDeleteCategory}
      handleAddCategory={onAddCategory}
      onHide={handleHideModal}
    />
  );
};

export default CategoryManagement;
