import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Header/Home";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import Testfront from "./components/Header/Testfront";
import UserLogin from "./components/UserAuth/userLogin";
import UserRegistration from "./components/UserAuth/userRegistration";
import SellerLogin from "./components/SellerAuth/sellerLogin";
import SellerRegister from "./components/SellerAuth/sellerRegister";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="w-full">
          <NavBar />
        </div>

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-register" element={<UserRegistration />} />
            <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/seller-register" element={<SellerRegister />} />
          </Routes>
        </div>

        {/* Fixed Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
