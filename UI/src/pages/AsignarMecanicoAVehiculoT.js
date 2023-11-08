import { useCallback, useContext, useEffect, useState } from "react";
import FormSection1 from "../components/FormSection1";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import styles from "./AsignarMecanicoAVehiculoT.module.css";
import SessionContext from "../context/SessionContext";

const AsignarMecanicoAVehiculoT = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Asignar mecanico a vehiculo/ Trabajos en progreso/ Cola de vehiculos Burger Menu" to the project
  }, []);

  const onRectangle9Click = useCallback(() => {
    // Please sync "Asignar mecanico a vehiculo seleccion" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  useEffect(() => {

  }, []);

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

  const [listaMecanicos, setListaMecanicos] = useState([{nombre: 'Emmanuel', id: 0}, {nombre: 'Miguel', id: 1}, {nombre: 'Isaac', id: 2}]);

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
        <Menu styles={{bmMenu: {
                        background: 'gray',
                        },
                        bmBurgerButton: {
                          width: "100px",
                          height: "100px",
                          position: "fixed",
                          top: "1px",
                          left: "1px"
                        }
                      }
                    }
       >
          <a style={{color: "black", fontSize: "25px"}} id="registrarmecanico">Administracion de Mecanicos</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/registrar-mecanico">Registrar Mecanico</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/eliminar-mecanico">Eliminar Mecanico</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Asignar Mecanico</a>
          <a style={{color: "black", fontSize: "25px"}} id="registrarmecanico">Visualizacion de trabajos</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/historial-de-trabajos">Historial de trabajos</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Trabajos en progreso</a>
          <a style={{color: "black", fontSize: "25px"}} id="registrarmecanico">Administracion de Servicios</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/agregar-servicio">Agregar servicio</a>
          <a style={{color: "black", fontSize: "20px", left: "50px", position: "relative"}} id="registrarmecanico" href="/editar-servicio">Administracion de precios y servicios</a>
          <a style={{color: "black", fontSize: "25px"}} id="registrarmecanico" href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Cola de Vehiculos</a>
        </Menu>
        <img
          className={styles.groupItem}
          alt=""
          src="/group-41.svg"
          onClick={onGroupIconClick}
        />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
        <Menu right styles={{bmMenu: {
                        background: 'gray',
                        },
                        bmBurgerButton: {
                          width: "100px",
                          height: "100px",
                          position: "fixed",
                          top: "1px",
                          left: "1300px"
                        }
                      }
                    }
       >
          <a style={{color: "black", fontSize: "25px"}} id="registrarmecanico" onClick={() => sessionContext.doLogOut()}>Cerrar Sesion</a>
        </Menu>
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
