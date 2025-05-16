import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Appointments from "../pages/Appointments";



const Main = () => (
  <main className="col px-4 py-3">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ueber_uns" element={<About />} />
      <Route path="/termine" element={<Appointments />} />
    </Routes>
  </main>
);
export default Main;