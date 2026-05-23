import React, { useState } from "react";
import VehiculoCard from "../components/VehiculoCard";
import useVehiculos from "../hooks/useVehiculos";

function VehiculosListB2C() {

  const { vehiculos, error, loading } = useVehiculos();

  const [search, setSearch] = useState("");

  const busqueda = search.toLowerCase();

  const vehiculosFiltrados = vehiculos.filter((vehiculo) => {

    return (
      vehiculo.indieVehicleModel?.toLowerCase().includes(busqueda) ||
      vehiculo.licensePlate?.toLowerCase().includes(busqueda)
    );

  });

  const vehiculosOrdenados = [...vehiculosFiltrados].sort((a, b) =>
    a.indieVehicleModel.localeCompare(b.indieVehicleModel)
  );

  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "16px",
      marginTop: "16px",
    },
  };

  if (loading) {
    return <p>Cargando vehículos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div>

      <h1>Marketplace Vehículos</h1>

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