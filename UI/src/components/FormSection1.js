import { useCallback } from "react";
import styles from "./FormSection1.module.css";

const FormSection1 = () => {
  const onUnion1IconClick = useCallback(() => {
    // Please sync "Editar fecha" to the project
  }, []);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.fechaInicioParent}>
        <div className={styles.fechaInicio}>Fecha inicio</div>
        <div className={styles.groupItem} />
        <img
          className={styles.union1Icon}
          alt=""
          src="/union1.svg"
          onClick={onUnion1IconClick}
        />
        <img className={styles.calendarDayIcon} alt="" src="/calendarday.svg" />
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion</div>
        <div className={styles.groupItem} />
        <img className={styles.union1Icon1} alt="" src="/union1.svg" />
        <img className={styles.union1Icon2} alt="" src="/union1.svg" />
        <div className={styles.xxXxXxxx}>XX-XX-XXXX</div>
      </div>
      <div className={styles.mecanicoParent}>
        <div className={styles.mecanico}>Mecanico</div>
        <div className={styles.rectangleDiv} />
        <div className={styles.mecanico1}>Mecanico 1</div>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupChild1} />
          <img className={styles.polygonIcon} alt="" src="/polygon-21.svg" />
        </div>
      </div>
      <div className={styles.modeloRenaultMegane}>
        Modelo: Renault Megane 2006
      </div>
      <div className={styles.placa619217}>Placa: 619217</div>
      <div className={styles.dueoFranciscoMurillo}>
        Dueño: Francisco Murillo Mogan
      </div>
      <img className={styles.groupIcon} alt="" src="/group-35.svg" />
    </div>
  );
};

export default FormSection1;
