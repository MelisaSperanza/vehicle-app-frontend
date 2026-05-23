import React, { useState } from "react";
import useVehiculos from "../hooks/useVehiculos";
import "./VehiculosListB2B.css";

function VehiculosListB2B() {

  const { vehiculos, error } = useVehiculos();
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  console.log(vehiculos);

  if (error) {
    return <p>{error}</p>;
  }

  const handleSelectAll = (e) => {

    if (e.target.checked) {

      const allVins = vehiculos.map(
        (vehiculo) => vehiculo.vin
      );

      setSelectedVehicles(allVins);

    } else {

      setSelectedVehicles([]);

    }

  };
  return (

    <div>

      <h1>B2B Vehículos</h1>

      <p>Total vehículos: {vehiculos.length}</p>

     <table className="vehiculos-table">

        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  vehiculos.length > 0 &&
                  selectedVehicles.length === vehiculos.length
                }
              />
              Select All
            </th>
            <th>VIN</th>
            <th>Matrícula</th>
            <th>Modelo Chasis</th>
            <th>Transmisión</th>
            <th>Ciudad actual</th>
            <th>País actual</th>
            <th>País registro/matrícula</th>
            <th>Año</th>
            <th>Kms</th>
            <th>PVP € IVA Incluido</th>
            <th>Estado reserva</th>

          </tr>
        </thead>

   
<tbody>
       
        {vehiculos.map((vehiculo) => (

          <tr key={vehiculo.vin}>

            <td>

              <input
                type="checkbox"

                checked={selectedVehicles.includes(
                  vehiculo.vin
                )}

                onChange={(e) => {

                  if (e.target.checked) {

                    setSelectedVehicles([
                      ...selectedVehicles,
                      vehiculo.vin
                    ]);

                  } else {

                    setSelectedVehicles(

                      selectedVehicles.filter(
                        (vin) => vin !== vehiculo.vin
                      )

                    );

                  }

                }}
              />

            </td>
              <td>{vehiculo.vin}</td>
              <td>{vehiculo.licensePlate}</td>
              <td>{vehiculo.chassisModel}</td>
              <td>{vehiculo.transmission}</td>
              <td>{vehiculo.currentLocation}</td>
              <td>{vehiculo.currentCountry}</td>
              <td>{vehiculo.registrationCountry}</td>
              <td>{vehiculo.modelYear}</td>
              <td>{vehiculo.kms}</td>
              <td>{vehiculo.livePriceEurInclVat}</td>
              <td>{vehiculo.reservationStatus}</td>
           

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default VehiculosListB2B;