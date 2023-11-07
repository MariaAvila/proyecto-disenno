import { useCallback, useEffect } from "react";
import styles from "./FormSection1.module.css";
import ReactDatePicker from "react-datepicker";

const FormSection1 = ({
  informacionVehiculo,
  listaMecanicos,
  indexVehiculo,
  onDateChange,
  onChangeDropDown,
  ...props
}) => {
  const onUnion1IconClick = useCallback(() => {
    // Please sync "Editar fecha" to the project
  }, []);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.fechaInicioParent}>
        <div className={styles.fechaInicio}>Fecha inicio</div>
        <input className={styles.groupItem} type="date" id="start" name="trip-start" onChange={(event) => {onDateChange(event.target.value, "fechaInicio", indexVehiculo)}}/>
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion</div>
        <input className={styles.groupItem} type="date" id="start" name="trip-start" onChange={(event) => {onDateChange(event.target.value, "fechaFinal", indexVehiculo)}}/>
      </div>
      <div className={styles.mecanicoParent}>
        <div className={styles.mecanico}>Mecanico</div>
        <select className={styles.rectangleDiv} name="userRole" onChange={(event) => onChangeDropDown(event.target.value, indexVehiculo)}>
          {listaMecanicos.map((mecanico) => 
            <option value={mecanico}>{mecanico}</option>
          )}
        </select>
      </div>
      <div className={styles.modeloRenaultMegane}>
        {`Modelo: ${informacionVehiculo.modelo}`}
      </div>
      <div className={styles.placa619217}>{`Placa: ${informacionVehiculo.placa}`}</div>
      <div className={styles.dueoFranciscoMurillo}>
        {`Dueño: ${informacionVehiculo.dueno}`}
      </div>
      <img className={styles.groupIcon} alt="" src="/group-35.svg" />
    </div>
  );
};

export default FormSection1;
