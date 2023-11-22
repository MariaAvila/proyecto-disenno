import styles from "./LandingPage.module.css";
import Navbar from "../components/NavBar";
import ContentCard from "../components/ContentCard";

const LandingPage = ({
  isLoggedIn,
  isClient,
  isMechanic
}) => {

  return (
    <div className={styles.landingPage}>
      <Navbar isLoggedIn={isLoggedIn} isClient={isClient} isMechanic={isMechanic}></Navbar>
      <div className={styles.container}>
        <ContentCard to={"/administracion-de-mecanicos"} title={"Administracion de Mecanicos"}></ContentCard>
        <ContentCard to={"/visualizacion-de-trabajos"} title={"Visualizacion de trabajos"}></ContentCard>
        <ContentCard to={"/administracion-de-servicios"} title={"Administracion de servicios"}></ContentCard>
        <ContentCard to={"/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"} title={"Cola de vehiculos"}></ContentCard>
      </div>
    </div>
  );
};

export default LandingPage;
