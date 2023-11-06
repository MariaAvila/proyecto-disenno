import { useCallback } from "react";
import FormSection1 from "../components/FormSection1";
import { useNavigate } from "react-router-dom";
import styles from "./AsignarMecanicoAVehiculoT.module.css";

const AsignarMecanicoAVehiculoT = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Asignar mecanico a vehiculo/ Trabajos en progreso/ Cola de vehiculos Burger Menu" to the project
  }, []);

  const onRectangle9Click = useCallback(() => {
    // Please sync "Asignar mecanico a vehiculo seleccion" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  return (
    <div className={styles.asignarMecanicoAVehiculoT}>
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
      <FormSection1 />
      <div className={styles.rectangleGroup}>
        <div className={styles.rectangleDiv} />
        <div className={styles.fechaInicioParent}>
          <div className={styles.fechaInicio}>Fecha inicio</div>
          <div className={styles.groupChild1} />
          <img className={styles.union1Icon} alt="" src="/union1.svg" />
          <img className={styles.union1Icon} alt="" src="/union1.svg" />
          <div className={styles.xxXxXxxx}>XX-XX-XXXX</div>
        </div>
        <div className={styles.fechaFinalizacionParent}>
          <div className={styles.fechaInicio}>Fecha Finalizacion</div>
          <div className={styles.groupChild1} />
          <img className={styles.union1Icon} alt="" src="/union1.svg" />
          <img className={styles.union1Icon} alt="" src="/union1.svg" />
          <div className={styles.xxXxXxxx}>XX-XX-XXXX</div>
        </div>
        <div className={styles.mecanicoParent}>
          <div className={styles.mecanico}>Mecanico</div>
          <div className={styles.groupChild3} onClick={onRectangle9Click} />
          <div className={styles.rectangleContainer}>
            <div className={styles.groupChild4} />
            <img className={styles.polygonIcon} alt="" src="/polygon-21.svg" />
          </div>
        </div>
        <div className={styles.modeloNissan350z}>Modelo: Nissan 350Z</div>
        <div className={styles.placa642754}>Placa: 642754</div>
        <div className={styles.dueoFranciscoMurillo}>
          Dueño: Francisco Murillo Mogan
        </div>
        <img className={styles.groupIcon} alt="" src="/group-35.svg" />
      </div>
      <div className={styles.groupDiv}>
        <div className={styles.groupChild5} />
        <div className={styles.guardar}>GUARDAR</div>
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default AsignarMecanicoAVehiculoT;
