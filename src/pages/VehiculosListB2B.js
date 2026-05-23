import React from "react";
import useVehiculos from "../hooks/useVehiculos";

function VehiculosListB2B() {

  const { vehiculos, error } = useVehiculos();

  console.log(vehiculos);

  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div>

      <h1>B2B Vehículos</h1>

      <p>Total vehículos: {vehiculos.length}</p>

      <table border="1">

        <thead>
          <tr>
            <th>VIN</th>
            <th>Matrícula</th>
          </tr>
        </thead>

        <tbody>

          {vehiculos.map((vehiculo) => (

            <tr key={vehiculo.vin}>

              <td>{vehiculo.vin}</td>

              <td>{vehiculo.licensePlate}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default VehiculosListB2B;