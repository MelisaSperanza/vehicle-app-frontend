import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VehiculoDetalle() {
  const { vin } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    fetch(`/vehiculos/${vin}`)
      .then((res) => res.json())
      .then((data) => setVehiculo(data));
  }, [vin]);

  if (!vehiculo) {
    return <div>Cargando vehículo...</div>;
  }

  return (
    <div>
      <h1>Detalle del Vehículo</h1>

      <p><b>VIN:</b> {vehiculo.VIN}</p>
      <p><b>Modelo:</b> {vehiculo.IndieVehicleModel}</p>
      <p><b>Chasis:</b> {vehiculo.ChassisModel}</p>
      <p><b>Transmisión:</b> {vehiculo.Transmission}</p>
      <p><b>País actual:</b> {vehiculo.CurrentCountry}</p>
      <p><b>KMs:</b> {vehiculo.KMs}</p>
      <p><b>Precio:</b> {vehiculo.LivePriceEurInclVat}</p>

      <img
        src={vehiculo.Thumbnail}
        alt="vehiculo"
        width="400"
      />
    </div>
  );
}

export default VehiculoDetalle;