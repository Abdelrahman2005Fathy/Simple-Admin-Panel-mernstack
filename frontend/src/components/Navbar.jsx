import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  // تحديد العنصر النشط بناءً على المسار الحالي
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-64 flex-shrink-0 fixed h-full bg-white shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
      </div>
      <ul className="py-2">
        <li>
          <Link
            to="/display"
            className={`flex items-center p-4 transition-colors duration-200 ${
              isActive('/display') 
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <FiGrid className="mr-3 text-lg" />
            <span className="font-medium">Display Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={`flex items-center p-4 transition-colors duration-200 ${
              isActive('/products')
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <FiShoppingCart className="mr-3 text-lg" />
            <span className="font-medium">Manage Products</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;