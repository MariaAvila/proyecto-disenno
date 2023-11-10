import { useCallback, useEffect, useState } from "react";
import styles from "./FormSection1.module.css";

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

  const [selectedMechanic, setSelectedMechanic] = useState(-1);

  useEffect(() => {
    setSelectedMechanic(listaMecanicos.find((mecanico) => mecanico.user_id === informacionVehiculo.mechanic) ? informacionVehiculo.mechanic : -1);
  }, [listaMecanicos]);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.fechaInicioParent}>
        <div className={styles.fechaInicio}>Fecha inicio</div>
        <input className={styles.groupItem} type="date" id="start" name="trip-start" onChange={(event) => {onDateChange(event.target.value, "start_date", indexVehiculo)}}/>
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion</div>
        <input className={styles.groupItem} type="date" id="start" name="trip-start" onChange={(event) => {onDateChange(event.target.value, "end_date", indexVehiculo)}}/>
      </div>
      <div className={styles.mecanicoParent}>
        <div className={styles.mecanico}>Mecanico</div>
        <select className={styles.rectangleDiv} name="userRole" value={selectedMechanic} onChange={(event) => {
          setSelectedMechanic(event.target.value);
          onChangeDropDown(event.target.value, indexVehiculo);
          }}>
            <option value={-1}></option>
          {listaMecanicos.map((mecanico) => 
            <option value={mecanico.user_id}>{mecanico.name}</option>
          )}
        </select>
      </div>
      <div className={styles.modeloRenaultMegane}>
        {`Modelo: ${informacionVehiculo.model}`}
      </div>
      <div className={styles.placa619217}>{`Placa: ${informacionVehiculo.plate}`}</div>
      <div className={styles.dueoFranciscoMurillo}>
        {`Dueño: ${informacionVehiculo.owner_name}`}
      </div>
      <img className={styles.groupIcon} alt="" src="/group-35.svg" />
    </div>
  );
};

export default FormSection1;
