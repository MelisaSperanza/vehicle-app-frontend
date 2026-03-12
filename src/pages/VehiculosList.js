import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VehiculosList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modeloFiltro, setModeloFiltro] = useState("");
  const [paisFiltro, setPaisFiltro] = useState("");
  const [precioMaxFiltro, setPrecioMaxFiltro] = useState("");
  const [anoMinFiltro, setAnoMinFiltro] = useState("");
  const [search, setSearch] = useState(""); // búsqueda general
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

  // Filtrado
  const vehiculosFiltrados = vehiculos.filter((v) => {
    const modelo = v.indieVehicleModel?.toLowerCase() || "";
    const pais = v.currentCountry?.toLowerCase() || "";
    const precio = parseFloat(v.livePriceEurInclVat || 0);
    const ano = parseInt(v.modelYear || 0);
    const busqueda = search.toLowerCase();

    const filtroModeloOk = modelo.includes(modeloFiltro.toLowerCase());
    const filtroPaisOk = pais.includes(paisFiltro.toLowerCase());
    const filtroPrecioOk =
      precioMaxFiltro === "" || precio <= parseFloat(precioMaxFiltro);
    const filtroAnoOk = anoMinFiltro === "" || ano >= parseInt(anoMinFiltro);
    const filtroBusquedaOk =
      v.vin.toLowerCase().includes(busqueda) ||
      v.licensePlate.toLowerCase().includes(busqueda);

    return filtroModeloOk && filtroPaisOk && filtroPrecioOk && filtroAnoOk && filtroBusquedaOk;
  });

  // Función para imprimir solo los filtrados
  const printFiltered = () => {
    const printContents = document.getElementById("printArea").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // opcional para restaurar event listeners
  };

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
        <input
          type="text"
          placeholder="Buscar por VIN o matrícula"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Botón generar informe */}
      <button
        onClick={printFiltered}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
      >
        Generar Informe
      </button>

      {/* Tabla */}
      <div id="printArea">
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
                <td>
                  <Link to={`/vehiculos/${v.vin}`}>{v.vin}</Link>
                </td>
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
                    onError={(e) => (e.target.src = "https://placehold.co/100")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehiculosList;