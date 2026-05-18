import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VehiculosListB2B.css";
//import VehiculoCard from "../components/VehiculoCard";

function VehiculosListB2B() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modeloFiltro, setModeloFiltro] = useState("");
  const [paisFiltro, setPaisFiltro] = useState("");
  const [precioMaxFiltro, setPrecioMaxFiltro] = useState("");
  const [anoMinFiltro, setAnoMinFiltro] = useState("");
  const [search, setSearch] = useState(""); // búsqueda general
  const [error, setError] = useState(null);
  const [ordenCampo, setOrdenCampo] = useState("");
  const [ordenDireccion, setOrdenDireccion] = useState("asc");
  const [selectedVehicles, setSelectedVehicles] = useState([]);

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

  //ordenación añadida en v1.3:
  const vehiculosOrdenados = [...vehiculosFiltrados].sort((a, b) => {

    if (!ordenCampo) return 0;

      let valorA = a[ordenCampo];
      let valorB = b[ordenCampo];

    if (ordenCampo === "livePriceEurInclVat" || ordenCampo === "modelYear") {
      valorA = Number(valorA);
      valorB = Number(valorB);
    }

    if (ordenCampo === "currentCountry") {
      valorA = valorA?.toLowerCase() || "";
      valorB = valorB?.toLowerCase() || "";
    }

    if (valorA < valorB) return ordenDireccion === "asc" ? -1 : 1;
    if (valorA > valorB) return ordenDireccion === "asc" ? 1 : -1;

  return 0;
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

  const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
};

  return (
    <div className="VehiculosListB2B">
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

    
    <div style={{marginBottom: "10px"}}>

      Ordenar por: &nbsp;

      <select onChange={(e) => setOrdenCampo(e.target.value)}>
        <option value="">---</option>
        <option value="livePriceEurInclVat">Precio</option>
        <option value="modelYear">Año</option>
        <option value="currentCountry">País</option>
      </select>

      <select onChange={(e) => setOrdenDireccion(e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

    </div>

        {/* Tabla */}
      <div id="printArea">
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Seleccionar</th>
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
              <th>Precio EUR (inc. IVA)</th>
            </tr>
          </thead>

          <tbody>
            {vehiculosOrdenados.map((vehiculo) => (
              <tr key={vehiculo.vin}>
                      <td>
                <input
                  type="checkbox"
                  checked={selectedVehicles.includes(vehiculo.vin)}
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

                <Link to={`/vehiculos/${vehiculo.vin}`}>{vehiculo.vin}</Link>
                <td>{vehiculo.licensePlate}</td>
                <td>{vehiculo.reservationStatus}</td>
                <td>{vehiculo.indieVehicleModel}</td>
                <td>{vehiculo.chassisModel} </td>
                <td>{vehiculo.transmission} </td>
                <td>{vehiculo.currentLocation} </td>
                <td>{vehiculo.currentCountry} </td>
                <td>{vehiculo.registrationCountry} </td>
                <td>{vehiculo.modelYear} </td>
                <td>{vehiculo.kms} </td>
                <td>{vehiculo.livePriceEurInclVat} € </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
          
    </div>
  
  );
}

export default VehiculosListB2B;