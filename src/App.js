import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartPage from "./components/cartPage";

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div style={{margin:"100px", marginBottom:"50px"}}>
        <Routes className="mt-5">
          <Route exact path="/" element={<ProductCard />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
