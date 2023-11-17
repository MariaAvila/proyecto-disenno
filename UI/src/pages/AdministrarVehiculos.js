import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdministrarVehiculos.module.css";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import { slide as Menu } from 'react-burger-menu';
import VehicleInformationUser from "../components/VehicleInformationUser";
import { postData } from "../Utils";

const AdministrarVehiculos = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);
  const [userCars, setUserCars] = useState([])

  useEffect(() => {
    refreshCars();
  }, []);

  function refreshCars(){
    postData("http://127.0.0.1:8000/get_cars", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email}).then((results) =>{
        setUserCars(results);
    });
  }

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page-user");
  }, [navigate]);

  const onRectangle1Click = useCallback(() => {
    navigate("/eliminar-mecanico-seleccion");
  }, [navigate]);

  const onRectangle3Click = useCallback(() => {
    let newCars = userCars.filter((car) => car.newCar === true);
    if(newCars.length <= 0){
      let newUserCars = [...userCars];
      newUserCars.push({
        car_id : 100,
        model: "",
        color: "",
        plate: "",
        image: "",
        newCar: true,
      });
      setUserCars([...newUserCars]);
    }
  }, [navigate]);

  return (
    <div className={styles.administrarVehiculos}>
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
        <img className={styles.groupItem} alt="" src="/group-41.svg" />
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
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
        <div className={styles.logo1} onClick={onLogoText1Click}>
          Logo
        </div>
      </div>
      {userCars.map((car, id) =>
        <VehicleInformationUser top={`${ 200 + id * 25}px`} informacionVehiculo={car} refershCars={refreshCars}></VehicleInformationUser>
      )}
      <div className={styles.scrollbarFrame}>
        <div className={styles.scrollbar} />
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupChild3} onClick={onRectangle3Click} />
        <div className={styles.agregarVehiculo}>AGREGAR VEHICULO</div>
      </div>
    </div>
  );
};

export default AdministrarVehiculos;
