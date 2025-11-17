import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPage from './components/Cartpage';


function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
     <Navbar/>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Getproducts />} />
        <Route path="/addautomotive" element={<Addproducts />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mpesapayment" element={<Mpesapayment />} />
        <Route path="/cart" element={<CartPage />} />


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App