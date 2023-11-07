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
        <div className={styles.xxXxXxxx}>{informacionVehiculo.fechaInicio}</div>
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion:</div>
        <div className={styles.xxXxXxxx1}>{informacionVehiculo.fechaFinal}</div>
      </div>
      <div className={styles.mecanicoMecanico1Wrapper}>
        <div className={styles.mecanicoMecanico1}>{informacionVehiculo.mecanico}</div>
      </div>
      <div className={styles.modeloRenaultMegane}>
      {`Modelo: ${informacionVehiculo.modelo}`}
      </div>
      <div className={styles.placa619217}>{`Placa: ${informacionVehiculo.placa}`}</div>
      <div className={styles.dueoFranciscoMurillo}>
      {`Dueño: ${informacionVehiculo.dueno}`}
      </div>
      <img className={styles.groupItem} alt="" src="/group-35.svg" />
    </div>
  );
};

export default SectionForm;
