import { useEffect, useState } from "react";

function useVehiculos() {

  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:8080/vehiculos")

      .then((res) => {

        if (!res.ok) {
          throw new Error("Error al cargar vehículos");
        }

        return res.json();
      })

      .then((data) => {
        setVehiculos(data);
        setLoading(false);
      })

      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  }, []);

  return {
    vehiculos,
    error,
    loading
  };
}

export default useVehiculos;