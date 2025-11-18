import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPage from './components/Cartpage';
import { CartProvider } from './components/Cartcontext';
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/index.html" element={<Getproducts />} />
              <Route path="/addelectronics" element={<Addproducts />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mpesapayment" element={<Mpesapayment />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App