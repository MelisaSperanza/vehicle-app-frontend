import React, { useState } from "react";
import VehiculoCard from "../components/VehiculoCard";
import useVehiculos from "../hooks/useVehiculos";
import "./General.css";
import "./Grids.css";

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

  /*const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "16px",
      marginTop: "16px",
    },
  };*/

  if (loading) {
    return <p className= "vehiculos-general-body h2">Cargando vehículos...</p>;
  }

  if (error) {
    return <p className= "vehiculos-general-body h2">{error}</p>;
  }

  return (

    <div className= "vehiculos-general-body">

      <h1 className= "vehiculos-general-body h1">Marketplace Vehículos</h1>

      <input className = "vehiculos-general-body input"
        type="text"
        placeholder="Buscar vehículo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="vehiculos-grid">

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