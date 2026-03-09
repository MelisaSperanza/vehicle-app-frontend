const BASE_URL = "http://localhost:8080/vehiculos"; // tu backend

export async function obtenerVehiculos() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Error al obtener vehículos");
  }
  return response.json();
}