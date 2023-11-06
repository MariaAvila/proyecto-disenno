import { useCallback } from "react";
import SectionForm from "../components/SectionForm";
import { useNavigate } from "react-router-dom";
import styles from "./HistorialDeTrabajos.module.css";

const HistorialDeTrabajos = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Historial de trabajos Burger Menu" to the project
  }, []);

  const onGroupContainer9Click = useCallback(() => {
    // Please sync "Historial de trabajos busqueda" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  return (
    <div className={styles.historialDeTrabajos}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
        <img
          className={styles.groupItem}
          alt=""
          src="/group-41.svg"
          onClick={onGroupIconClick}
        />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
      </div>
      <SectionForm />
      <div className={styles.rectangleGroup}>
        <div className={styles.rectangleDiv} />
        <div className={styles.modeloNissan350z}>Modelo: Nissan 350Z</div>
        <div className={styles.placa642754}>Placa: 642754</div>
        <div className={styles.dueoFranciscoMurillo}>
          Dueño: Francisco Murillo Mogan
        </div>
        <img className={styles.groupIcon} alt="" src="/group-35.svg" />
        <div className={styles.fechaInicioParent}>
          <div className={styles.fechaInicio}>Fecha inicio:</div>
          <div className={styles.xxXxXxxx}>XX-XX-XXXX</div>
        </div>
        <div className={styles.fechaFinalizacionParent}>
          <div className={styles.fechaInicio}>Fecha Finalizacion:</div>
          <div className={styles.xxXxXxxx1}>XX-XX-XXXX</div>
        </div>
        <div className={styles.mecanicoMecanico1Wrapper}>
          <div className={styles.mecanicoMecanico1}>Mecanico: Mecanico 1</div>
        </div>
      </div>
      <div
        className={styles.rectangleContainer}
        onClick={onGroupContainer9Click}
      >
        <div className={styles.groupChild1} />
        <div className={styles.buscar}>BUSCAR</div>
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default HistorialDeTrabajos;
