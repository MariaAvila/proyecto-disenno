import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MecanicosContainer from "../components/MecanicosContainer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    navigate("/administracion-de-mecanicos");
  }, [navigate]);

  const onGroupContainer2Click = useCallback(() => {
    navigate("/visualizacion-de-trabajos");
  }, [navigate]);

  const onGroupContainer4Click = useCallback(() => {
    navigate("/administracion-de-servicios");
  }, [navigate]);

  const onGroupContainer3Click = useCallback(() => {
    navigate(
      "/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"
    );
  }, [navigate]);

  return (
    <div className={styles.landingPage}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
        <img className={styles.groupItem} alt="" src="/group-41.svg" />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
      </div>
      <MecanicosContainer
        mechanicManagementTitle="Administracion de Mecanicos"
        propLeft="230px"
        propTop="243px"
        onGroupContainer1Click={onGroupContainer1Click}
      />
      <MecanicosContainer
        mechanicManagementTitle="Visualizacion de trabajos"
        propLeft="820px"
        propTop="243px"
        onGroupContainer1Click={onGroupContainer2Click}
      />
      <div className={styles.rectangleGroup} onClick={onGroupContainer3Click}>
        <div className={styles.rectangleDiv} />
        <div className={styles.colaDeVehiculos}>Cola de vehiculos</div>
        <img className={styles.lineIcon} alt="" src="/line-8.svg" />
        <img className={styles.groupChild1} alt="" src="/line-8.svg" />
      </div>
      <MecanicosContainer
        mechanicManagementTitle="Administracion de servicios"
        propLeft="230px"
        propTop="602px"
        onGroupContainer1Click={onGroupContainer4Click}
      />
    </div>
  );
};

export default LandingPage;
