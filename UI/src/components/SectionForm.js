import styles from "./SectionForm.module.css";

const SectionForm = ({
  informacionVehiculo,
  ...props
}) => {
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.fechaInicioParent}>
        <div className={styles.fechaInicio}>Fecha inicio:</div>
        <div className={styles.xxXxXxxx}>{informacionVehiculo.start_date}</div>
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion:</div>
        <div className={styles.xxXxXxxx1}>{informacionVehiculo.end_date}</div>
      </div>
      <div className={styles.mecanicoMecanico1Wrapper}>
        <div className={styles.mecanicoMecanico1}>{informacionVehiculo.mechanic_name}</div>
      </div>
      <div className={styles.modeloRenaultMegane}>
      {`Modelo: ${informacionVehiculo.model}`}
      </div>
      <div className={styles.placa619217}>{`Placa: ${informacionVehiculo.plate}`}</div>
      <div className={styles.dueoFranciscoMurillo}>
      {`Dueño: ${informacionVehiculo.owner_name}`}
      </div>
      <img className={styles.groupItem} alt="" src="/group-35.svg" />
    </div>
  );
};

export default SectionForm;
