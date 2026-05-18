function VehicleGrid({ vehiculos }) {
  return (
    <div style={styles.grid}>
      {vehiculos.map((v) => (
        <VehiculoCard key={v.id} vehiculo={v} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
    padding: "16px",
  },
};

export default VehicleGrid;