import React, { useEffect, useState } from "react";
import VehiculoCard from "../components/VehiculoCard";

function VehiculosListB2C() {
  const [vehiculos, setVehiculos] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/vehiculos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar vehículos");
        return res.json();
      })
      .then((data) => {
        setVehiculos(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const vehiculosFiltrados = vehiculos.filter((v) => {
    const busqueda = search.toLowerCase();

    return (
      v.indieVehicleModel?.toLowerCase().includes(busqueda) ||
      v.licensePlate?.toLowerCase().includes(busqueda)
    );
  });

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "16px",
      marginTop: "16px",
    },
  };

  return (
    <div>
      <h1>Marketplace Vehículos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Buscar vehículo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

   

       <div style={styles.grid}>
  {vehiculosOrdenados.map((vehiculo) => (
    <VehiculoCard
      key={vehiculo.vin}
      vehiculo={vehiculo}
    />
  ))}
</div>
    </div>
  );
}

export default VehiculosListB2C;