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
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Categorias</h2>
      <div>
        {/* Formulário para adicionar nova categoria */}
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Adicionar Categoria</button>
      </div>
      <ul>
        {/* Renderiza a lista de categorias existentes */}
        {categories.map((category, index) => (
          <li key={index}>
            {category}
            <button onClick={() => onDeleteCategory(category)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
