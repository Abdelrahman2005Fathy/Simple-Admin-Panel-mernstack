import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductManagement from './components/ProductManagement';
import Home from './Home';
import ProductsProvider from './context/ProductsProvider'; 
import DisplayProducts from './components/DisplayProducts';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="products" element={<ProductManagement />} />
            <Route path="display" element={<DisplayProducts />} />
          </Route>
        </Routes>
      </ProductsProvider>
    </Router>
  );
}

export default App;