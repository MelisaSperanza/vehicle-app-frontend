import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehiculosListB2B from "./pages/VehiculosListB2B";
import VehiculoDetalle from "./pages/VehiculoDetalle";
import VehiculosListB2C from "./pages/VehiculosListB2C";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/VehiculosListB2C"
          element={<VehiculosListB2C />}
        />
         <Route path="/VehiculosListB2B" element={<VehiculosListB2B />} />       
        <Route path="/vehiculos/:vin" element={<VehiculoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;