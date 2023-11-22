import styles from "./AdministracionDeMecanicos.module.css";
import Navbar from "../components/NavBar";
import ContentCard from "../components/ContentCard";

const AdministracionDeMecanicos = ({
  isLoggedIn,
  isClient,
  isMechanic
}) => {
  return (
    <div className={styles.administracionDeMecanicos}>
      <Navbar isLoggedIn={isLoggedIn} isClient={isClient} isMechanic={isMechanic}></Navbar>
      <div className={styles.container}>
        <ContentCard to={"/registrar-mecanico"} title={"Registrar Mecanico"}></ContentCard>
        <ContentCard to={"/eliminar-mecanico"} title={"Eliminar mecanico"}></ContentCard>
        <ContentCard to={"/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"} title={"Asignar mecanico a vehiculo"}></ContentCard>
      </div>
    </div>
  );
};

export default AdministracionDeMecanicos;
