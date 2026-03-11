import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehiculosList from "./pages/VehiculosList";
import VehiculoDetalle from "./pages/VehiculoDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehiculosList />} />
        <Route path="/vehiculos" element={<VehiculosList />} />
        <Route path="/vehiculos/:vin" element={<VehiculoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;