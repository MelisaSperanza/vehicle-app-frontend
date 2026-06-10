//const API_URL = "http://localhost:8080";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export async function getVehiculos() {

  const response = await fetch(`${API_URL}/vehiculos`);

  if (!response.ok) {
    throw new Error("Error cargando vehículos");
  }

  return response.json();
}

export async function getVehiculoByVin(vin) {

  const vehiculos = await getVehiculos();

  return vehiculos.find(v => v.vin === vin);
}