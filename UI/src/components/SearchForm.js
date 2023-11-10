import { useState } from "react";
import styles from "./SearchForm.module.css";

/*
<div className={styles.fechaInicioParent}>
        <div className={styles.fechaInicio}>Fecha inicio:</div>
        <div className={styles.xxXxXxxx}>{informacionVehiculo.fechaInicio}</div>
      </div>
      <div className={styles.fechaFinalizacionParent}>
        <div className={styles.fechaInicio}>Fecha Finalizacion:</div>
        <div className={styles.xxXxXxxx1}>{informacionVehiculo.fechaFinal}</div>
      </div>
*/

const SearchForm = ({
  searchParameters,
  onPropertyChange,
  listaMecanicos,
  ...props
}) => {

  const [selectedMechanic, setSelectedMechanic] = useState(-1);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      
      <div className={styles.mecanicoMecanico1Wrapper}>
        Mecanico:
        <select className={styles.mecanicoParamater} value={selectedMechanic} name="userRole" onChange={(event) => {
            onPropertyChange('mecanicoParamater', event.target.value);
            setSelectedMechanic(event.target.value);
            }}>
          <option value={-1}>{}</option>
          {listaMecanicos.map((mecanico) => 
            <option value={mecanico.user_id}>{mecanico.name}</option>
          )}
        </select>
      </div>
      <div className={styles.modeloRenaultMegane}>
        Modelo: 
        <input className={styles.modeloParamater} onChange={(event) => onPropertyChange("modelParameter", event.target.value)}></input>
      </div>
      <div className={styles.placa619217}>
        Placa:
        <input className={styles.placaParamater} onChange={(event) => onPropertyChange("placaParameter", event.target.value)}></input>
      </div>
      <div className={styles.dueoFranciscoMurillo}>
        Dueño:
      <input className={styles.duenoParamater} onChange={(event) => onPropertyChange("duenoParameter", event.target.value)}></input>
      </div>
      <img className={styles.groupItem} alt="" src="/group-35.svg" />
    </div>
  );
};

export default SearchForm;
