import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehiculosListB2B from "./pages/VehiculosListB2B";
import VehiculoDetalle from "./pages/VehiculoDetalle";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehiculosListB2B />} />
        <Route path="/vehiculos" element={<VehiculosListB2B />} />
        <Route path="/vehiculos/:vin" element={<VehiculoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;