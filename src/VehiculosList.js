import React, { useEffect, useState } from "react";

function VehiculosList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modeloFiltro, setModeloFiltro] = useState("");
  const [paisFiltro, setPaisFiltro] = useState("");
  const [precioMaxFiltro, setPrecioMaxFiltro] = useState("");
  const [anoMinFiltro, setAnoMinFiltro] = useState("");

  const [error, setError] = useState(null);

  // Fetch al backend
  useEffect(() => {
    fetch("http://localhost:8080/vehiculos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar vehículos");
        return res.json();
      })
      .then((data) => {
        console.log("DATOS BACKEND:", data);
        setVehiculos(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  // Filtrado de la lista antes de renderizar
  const vehiculosFiltrados = vehiculos.filter((v) => {
const modeloIndie = v.indieVehicleModel?.toLowerCase() || "";
const pais = v.currentCountry?.toLowerCase() || "";
const precio = parseFloat(v.livePriceEurInclVat || 0);
const ano = parseInt(v.modelYear || 0);

    const filtroModeloOk = modeloIndie.includes(modeloFiltro.toLowerCase());
    const filtroPaisOk = pais.includes(paisFiltro.toLowerCase());
    const filtroPrecioOk =
      precioMaxFiltro === "" || precio <= parseFloat(precioMaxFiltro);
    const filtroAnoOk = anoMinFiltro === "" || ano >= parseInt(anoMinFiltro);

    return filtroModeloOk && filtroPaisOk && filtroPrecioOk && filtroAnoOk;
  });

  return (
    <div className="VehiculosList">
      <h1>Listado de Vehículos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Inputs de filtros */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Filtrar por modelo indie"
          value={modeloFiltro}
          onChange={(e) => setModeloFiltro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por país"
          value={paisFiltro}
          onChange={(e) => setPaisFiltro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMaxFiltro}
          onChange={(e) => setPrecioMaxFiltro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Año mínimo"
          value={anoMinFiltro}
          onChange={(e) => setAnoMinFiltro(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Matrícula</th>
            <th>Estado Reserva</th>
            <th>Modelo Indie</th>
            <th>Modelo Chasis</th>
            <th>Transmisión</th>
            <th>Ubicación Actual</th>
            <th>País Actual</th>
            <th>País Registro</th>
            <th>Año Modelo</th>
            <th>KMs</th>
            <th>Moneda</th>
            <th>Tipo Cambio EUR Local</th>
            <th>Precio EUR (inc. IVA)</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
       <tbody>
  {vehiculosFiltrados.map((v) => (
    <tr key={v.vin}>
      <td>{v.vin}</td>
      <td>{v.licensePlate}</td>
      <td>{v.reservationStatus}</td>
      <td>{v.indieVehicleModel}</td>
      <td>{v.chassisModel}</td>
      <td>{v.transmission}</td>
      <td>{v.currentLocation}</td>
      <td>{v.currentCountry}</td>
      <td>{v.registrationCountry}</td>
      <td>{v.modelYear}</td>
      <td>{v.kms}</td>
      <td>{v.currency}</td>
      <td>{v.eurLocalRate}</td>
      <td>{v.livePriceEurInclVat}</td>
      <td>
        <img
          src={v.thumbnailUrl}
          alt={v.indieVehicleModel}
          width="100"
        />
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default VehiculosList;