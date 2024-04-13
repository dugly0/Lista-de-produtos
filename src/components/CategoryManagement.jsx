import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

// Componente para adicionar e excluir categorias
const CategoryManagement = ({
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState(""); // Estado para a nova categoria

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      onAddCategory(newCategory);
      setNewCategory("");
      setMostrarInput(false);
    }
  };
  const handleDeleteCategory = (category) => {
    // Exibe um alerta de confirmação antes de excluir a categoria
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir a categoria "${category}"?`);
    if (confirmDelete) {
      onDeleteCategory(category);
    }
  };

  

  const [mostrarInput, setMostrarInput] = useState(false);

  return (
    <div>
      <h2>Categorias</h2>
      <div>
      <ul style={{
        listStyleType:'none'
      }}>
        {/* Renderiza a lista de categorias existentes */}
        {categories.map((category, index) => (
          <li key={index}>
            - {category}
            <FontAwesomeIcon className="xmark" style={{cursor:'pointer'}} icon={faXmark}  onClick={()=>handleDeleteCategory(category)}>Excluir</FontAwesomeIcon>
          </li>
        ))}
      </ul>
      </div>
      <div>
      {mostrarInput ? (
       <div>
       {/* Formulário para adicionar nova categoria */}
       <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="bt mt-1" onClick={handleAddCategory} >Criar</button>
      </div>
       ) : (
       <u style={{cursor: 'pointer'}} onClick={() => setMostrarInput(true) }>+ Criar nova categoria</u>
       )}
       </div>
    </div>
  );
};

export default CategoryManagement;
