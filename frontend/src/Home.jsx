import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-[1200px] w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;