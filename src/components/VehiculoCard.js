function VehiculoCard({ vehiculo }) {
  return (
    <article style={styles.card}>
      <div style={styles.image}>
        🚐
      </div>

      <div style={styles.body}>
        <h2 style={styles.title}>
          {vehiculo.indieVehicleModel}
        </h2>

        <p style={styles.price}>
          {vehiculo.livePriceEurInclVat} € IVA incluido
        </p>

        <p style={styles.meta}>
          {vehiculo.currentLocation || "Ubicación no disponible"}
        </p>
      </div>
    </article>
  );
}

const styles = {
  card: {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #eee",
    backgroundColor: "#fff",
    width: "280px",
  },
  image: {
    height: "160px",
    backgroundColor: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },
  body: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  title: {
    fontSize: "16px",
    margin: 0,
  },
  price: {
    fontWeight: "bold",
    margin: 0,
  },
  meta: {
    fontSize: "12px",
    color: "#777",
    margin: 0,
  },
};

export default VehiculoCard;
