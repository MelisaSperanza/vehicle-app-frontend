import React, { useEffect, useState } from 'react';

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modeloFiltro, setModeloFiltro] = useState('');
  const [paisFiltro, setPaisFiltro] = useState('');
  const [precioMaxFiltro, setPrecioMaxFiltro] = useState('');

  useEffect(() => {
    fetch('/vehiculos')
      .then((res) => res.json())
      .then((data) => {
        // Quitamos la primera fila (cabecera) y guardamos los datos
        const vehiculosSinCabecera = data.slice(1);
        setVehiculos(vehiculosSinCabecera);
      })
      .catch((err) => console.error('Error al cargar vehículos:', err));
  }, []);

  //Filtrado de la lista antes de renderizar
  const vehiculosFiltrados = vehiculos.filter((vehiculo) => {
    const modeloIndie = vehiculo[3]?.toLowerCase() || '';
    const pais = vehiculo[7]?.toLowerCase() || '';
    const precio = parseFloat(vehiculo[15]?.replace(',', '') || '0');

    const filtroModeloOk = modeloIndie.includes(modeloFiltro.toLowerCase());
    const filtroPaisOk = pais.includes(paisFiltro.toLowerCase());
    const filtroPrecioOk = precioMaxFiltro === '' || precio <= parseFloat(precioMaxFiltro);

    return filtroModeloOk && filtroPaisOk && filtroPrecioOk;
  });

  return (
    <div className="App">
      <h1>Listado de Vehículos</h1>
      
      {/* Inputs para filtrar */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filtrar por modelo indie"
          value={modeloFiltro}
          onChange={e => setModeloFiltro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por país"
          value={paisFiltro}
          onChange={e => setPaisFiltro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMaxFiltro}
          onChange={e => setPrecioMaxFiltro(e.target.value)}
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
            <th>Precio EUR (inc. IVA)</th>
          </tr>
        </thead>
        <tbody>
          {vehiculosFiltrados.map((vehiculo, index) => (
            <tr key={index}>
              <td>{vehiculo[0]}</td>
              <td>{vehiculo[1]}</td>
              <td>{vehiculo[2]}</td>
              <td>{vehiculo[3]}</td>
              <td>{vehiculo[4]}</td>
              <td>{vehiculo[5]}</td>
              <td>{vehiculo[6]}</td>
              <td>{vehiculo[7]}</td>
              <td>{vehiculo[8]}</td>
              <td>{vehiculo[9]}</td>
              <td>{vehiculo[10]}</td>
              <td>{vehiculo[11]}</td>
              <td>{vehiculo[15]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
