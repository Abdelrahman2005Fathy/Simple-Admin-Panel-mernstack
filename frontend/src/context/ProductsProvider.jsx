import React, { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Create context with default values for better IDE autocompletion
export const ProductsContext = createContext({
  products: [],
  newProduct: { name: '', price: '', description: '' },
  setProducts: () => {},
  setNewProduct: () => {},
  handleAddProduct: () => {},
  handleDeleteProduct: () => {},
});

// Constants should be in uppercase and preferably in a separate config file
const API_URL = import.meta.env.VITE_API_URL;

// Custom hook for product API calls
const useProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchProducts();
      setNewProduct({ name: '', price: '', description: '' });
    } catch (err) {
      console.error('Failed to add product:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [newProduct, fetchProducts]);

  const handleDeleteProduct = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchProducts();
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts]);

  return {
    products,
    newProduct,
    setProducts,
    setNewProduct,
    handleAddProduct,
    handleDeleteProduct,
    isLoading,
    error,
    fetchProducts,
  };
};

const ProductsProvider = ({ children }) => {
  const productAPI = useProductAPI();

  // Initial data fetch
  useEffect(() => {
    productAPI.fetchProducts();
  }, [productAPI.fetchProducts]);

  return (
    <ProductsContext.Provider value={productAPI}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;