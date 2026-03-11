const API_URL = "http://localhost:8080";

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