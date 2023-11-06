import styles from "./SectionForm.module.css";

const SectionForm = () => {
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.fechaInicioParent}>
        <div className={styles.fechaInicio}>Fecha inicio:</div>
        <img className={styles.calendarDayIcon} alt="" src="/line-8.svg" />
        <div className={styles.xxXxXxxx}>XX-XX-XXXX</div>
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion:</div>
        <div className={styles.xxXxXxxx1}>XX-XX-XXXX</div>
      </div>
      <div className={styles.mecanicoMecanico1Wrapper}>
        <div className={styles.mecanicoMecanico1}>Mecanico: Mecanico 1</div>
      </div>
      <div className={styles.modeloRenaultMegane}>
        Modelo: Renault Megane 2006
      </div>
      <div className={styles.placa619217}>Placa: 619217</div>
      <div className={styles.dueoFranciscoMurillo}>
        Dueño: Francisco Murillo Mogan
      </div>
      <img className={styles.groupItem} alt="" src="/group-35.svg" />
    </div>
  );
};

export default SectionForm;
