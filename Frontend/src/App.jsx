import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div className=" h-screen bg-black">
        <div className="w-full">
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
