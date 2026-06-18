import React, { useState } from "react";
import useVehiculos from "../hooks/useVehiculos";
import "./Tables.css";
import "./General.css";
import "./ProgressBar.css";
import jsPDF from "jspdf";

function VehiculosListB2B() {

  const { vehiculos, loading, error } = useVehiculos();
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const [filters, setFilters] = useState({
  vin: "",
  licensePlate: "",
  chassisModel: "",
  transmission: "",
  currentLocation: "",
  currentCountry: "",
  registrationCountry: "",
  modelYear: "",
  kms: "",
  livePriceEurInclVat: "",
  reservationStatus: ""
});
  console.log(vehiculos);

if (loading) {
  return <div classname="progress-bar"></div>
}

  if (error) {
    return <p>{error}</p>;
  }
  

const handleFilterChange = (e) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value
  });
};

const filteredVehiculos = vehiculos.filter((vehiculo) => {

  return Object.keys(filters).every((key) => {

    return String(vehiculo[key] ?? "")
      .toLowerCase()
      .includes(filters[key].toLowerCase());

  });

});

  const handleSelectAll = (e) => {

    if (e.target.checked) {

      const allVins = vehiculos.map(
        (vehiculo) => vehiculo.vin
      );

      setSelectedVehicles(allVins);

    } else {

      setSelectedVehicles([]);

    }};

    //reporte descargable en pdf
    const handleDownloadPDF = () => {
      const doc = new jsPDF();

      const logo = new Image();
      logo.src = "/LogoIndie.png";

      const logoWidth=30;
      const logoHeight=10;
      const logoMargin=10;
      const pageWidth = doc.internal.pageSize.getWidth();

      logo.onload = () => {

        doc.addImage(logo, "PNG", pageWidth - logoWidth - logoMargin, //posición X dinámica
         logoMargin,//posición Y
         logoWidth,
         logoHeight);


        doc.setFontSize(16);
        doc.text("Listado de Vehículos seleccionados", 10, 20);

        let y = 30;

        const selectedData = vehiculos.filter(v =>
          selectedVehicles.includes(v.vin)
        );

        selectedData.forEach((v, index) => {
          doc.setFontSize(10);

          doc.text(
            `${index + 1}. VIN: ${v.vin} | Modelo: ${v.chassisModel} | KM: ${v.kms} | Precio: €${v.livePriceEurInclVat}`,
            10,
            y
          );

          y += 10;

          // salto de página si se llena
          if (y > 280) {
            doc.addPage();
            y = 10;
          }
        });

        doc.save("vehiculos-seleccionados.pdf");
      };

  } 

  return (

    <div className="vehiculos-general-body">

      <h1 className="vehiculos-general-body h1">B2B Vehículos</h1>

      <p className="vehiculos-general-body h2">Total vehículos: {vehiculos.length}</p>

      <button
        onClick={handleDownloadPDF}
        disabled={selectedVehicles.length === 0}
        className="home-button"
      >
        Descargar PDF ({selectedVehicles.length})
      </button>


<div className="filters-container">

  <input
    type="text"
    name="vin"
    placeholder="Filtrar VIN"
    value={filters.vin}
    onChange={handleFilterChange}
  />

  <input
    type="text"
    name="chassisModel"
    placeholder="Modelo"
    value={filters.chassisModel}
    onChange={handleFilterChange}
  />

  <input
    type="text"
    name="transmission"
    placeholder="Transmisión"
    value={filters.transmission}
    onChange={handleFilterChange}
  />

  <input
    type="text"
    name="currentCountry"
    placeholder="País actual"
    value={filters.currentCountry}
    onChange={handleFilterChange}
  />

  <input
    type="text"
    name="reservationStatus"
    placeholder="Estado reserva"
    value={filters.reservationStatus}
    onChange={handleFilterChange}
  />

</div>


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
       
        {filteredVehiculos.map((vehiculo) => (

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