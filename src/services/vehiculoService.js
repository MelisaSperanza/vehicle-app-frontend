//const BASE_URL = "http://localhost:3000/vehiculos"; //  backend
const BASE_URL = `${process.env.REACT_APP_API_URL}/vehiculos`;


export async function obtenerVehiculos() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Error al obtener vehículos");
  }
  return response.json();
}