import React, { useContext } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { ProductsContext } from '../context/ProductsProvider';

const ProductManagement = () => {
  const {
    products,
    newProduct,
    setNewProduct,
    handleAddProduct,
    handleDeleteProduct,
    isLoading,
    error
  } = useContext(ProductsContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  if (error) {
    return (
      <div className="p-10 ml-48 w-full max-w-4xl mx-auto text-red-500">
        Error: {error}
      </div>
    );
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="p-10 ml-48 w-full max-w-4xl mx-auto">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-10 ml-48 w-full max-w-4xl mx-auto">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border rounded px-4 py-2 flex-1"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border rounded px-4 py-2 w-32"
          value={newProduct.price || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border rounded px-4 py-2 flex-1"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <button 
          onClick={handleAddProduct}
          disabled={isLoading}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;