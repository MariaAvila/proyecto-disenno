import { useCallback, useState } from "react";
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

  const [unassignedCars, setUnassignedCars] = useState([
    {
      modelo: "Renault Megane 2006",
      dueno: "Francisco Murillo Morgan",
      placa: "619217",
      mecanico: "",
      fechaInicio: "",
      fechaFinal: ""
    },
    {
      modelo: "Nissan 350Z",
      dueno: "Francisco Murillo Morgan",
      placa: "642754",
      mecanico: "",
      fechaInicio: "",
      fechaFinal: ""
    },
  ])

  const [listaMecanicos, setListaMecanicos] = useState(['Emmanuel', "Miguel", "Isaac"]);

  function onSave(){
    if(confirm('Esta seguro que desea guardar los cambios?')){
      console.log(unassignedCars);
      navigate('/administracion-de-mecanicos');
    }
  }

  function onDateChange(date, propertyName, index){
    unassignedCars[index][propertyName] = date;
  }

  function onChangeDropDown(newValue, index){
    unassignedCars[index]['mecanico'] = newValue;
  }

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
      {unassignedCars.map((carroSinAsignar, index) => 
        <FormSection1 informacionVehiculo={carroSinAsignar} listaMecanicos={listaMecanicos} indexVehiculo={index} onDateChange={(date, property, index) => onDateChange(date, property, index)} onChangeDropDown={(newValue, index) => onChangeDropDown(newValue, index)}/>
      )}
      <div className={styles.groupDiv} style={{top: `${311 + unassignedCars.length * 260}px`}} onClick={onSave}>
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
