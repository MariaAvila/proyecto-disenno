import styles from "./AdministracionDeServicios.module.css";
import Navbar from "../components/NavBar";
import ContentCard from "../components/ContentCard";

const AdministracionDeServicios = ({
  isLoggedIn,
  isClient,
  isMechanic
}) => {
  return (
    <div className={styles.administracionDeMecanicos}>
      <Navbar isLoggedIn={isLoggedIn} isClient={isClient} isMechanic={isMechanic}></Navbar>
      <div className={styles.container}>
        <ContentCard to={"/agregar-servicio"} title={"Agregar servicio"}></ContentCard>
        <ContentCard to={"/editar-servicio"} title={"Administracion de precios y servicios"}></ContentCard>
      </div>
    </div>
  );
};

export default AdministracionDeServicios;
