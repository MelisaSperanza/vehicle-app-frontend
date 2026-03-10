import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

function VehiculoDetalle() {

  const { vin } = useParams();

  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/vehiculos")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar vehículos");
        return res.json();
      })
      .then(data => {
        const encontrado = data.find(v => v.vin === vin);
        setVehiculo(encontrado);

        if (!encontrado){
            setError("Vehículo no encontrado");
        }

      })
      .catch(err => {
        setError(err.message);
      });

  }, [vin]);

  if (error) return <p style={{color:"red"}}>{error}</p>;

  if (!vehiculo) return <p>Cargando vehículo...</p>;

  return (
    <div>

      <h2>Detalle del Vehículo</h2>

      <img
        src={vehiculo.thumbnailUrl}
        alt={vehiculo.indieVehicleModel}
        width="300"
        onError={(e)=> e.target.src="https://placehold.co/300"}
      />

      <p><b>VIN:</b> {vehiculo.vin}</p>
      <p><b>Matrícula:</b> {vehiculo.licensePlate}</p>
      <p><b>Modelo:</b> {vehiculo.indieVehicleModel}</p>
      <p><b>Chasis:</b> {vehiculo.chassisModel}</p>
      <p><b>Transmisión:</b> {vehiculo.transmission}</p>
      <p><b>KMs:</b> {vehiculo.kms}</p>
      <p><b>Año:</b> {vehiculo.modelYear}</p>
      <p><b>País actual:</b> {vehiculo.currentCountry}</p>
      <p><b>Precio:</b> {vehiculo.livePriceEurInclVat} EUR</p>
        <br />
        <Link to="/vehiculos">← Volver a la lista</Link>
    </div>
  );
}

export default VehiculoDetalle;