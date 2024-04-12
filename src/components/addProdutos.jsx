import React, { useState, useMemo } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Nome do Produto:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label>
        Categoria:
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Selecione uma categoria...</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Preço de Compra:
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
      </label>
      <label>
        Preço de Venda:
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
      </label>
      <label>
        Estoque:
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </label>
      <label>
        Prioridade:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="importante">Importante</option>
        </select>
      </label>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};

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

// Componente principal que mantém o estado dos produtos e categorias
const ProductManagementApp = () => {
  const [products, setProducts] = useState([]); // Estado para os produtos
  const [categories, setCategories] = useState([]); // Estado para as categorias
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
      <h1>Gestão de Produtos do Supermercado</h1>
      {/* Componente de formulário para adicionar produtos */}
      <AddProductForm onAdd={handleAddProduct} categories={categories} />
      {/* Componente de lista de produtos */}
      <ProductList
        products={products}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDeleteProduct}
      />
      {/* Componente de lista de produtos favoritos */}
      <FavoriteProductList favoriteProducts={favoriteProducts} />
      {/* Componente de gerenciamento de categorias */}
      <CategoryManagement
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default ProductManagementApp;
