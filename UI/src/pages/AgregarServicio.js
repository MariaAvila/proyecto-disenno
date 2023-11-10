import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import styles from "./AgregarServicio.module.css";
import { postData } from "../Utils";
import SessionContext from "../context/SessionContext";

const AgregarServicio = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Agregar Servicio Burger Menu" to the project
  }, []);

  const onRectangle1Click = useCallback(() => {
    navigate("/administracion-de-servicios");
  }, []);

  const onRectangle2Click = useCallback(() => {
    // Please sync "Agregar Servicio" to the project
  }, []);

  const [nombreServicio, setNombreServicio] = useState("");
  const [rangodePrecio, setRangodePrecio] = useState("");

  function setName(value){
    setNombreServicio(value);
  }

  function setPrecio(precio){
    setRangodePrecio(precio);
  }

  function onGroupContainer4Click(){
    if(confirm('Esta seguro que desea agregar el servicio?')){
      postData("http://127.0.0.1:8000/add_service", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, name: nombreServicio, price: rangodePrecio, workshop: sessionContext.getUserDetails().workshop_id}).then((results) =>{
        alert("Servicio Agregado con exito");
        navigate("/administracion-de-servicios");
      });
    }
  };

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  return (
    <div className={styles.agregarServicio}>
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
          onClick={() => onGroupIconClick()}
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
      <div className={styles.nombreDeServicioParent}>
        <div className={styles.nombreDeServicio}>Nombre de servicio</div>
        <input className={styles.rectangleDiv} value={nombreServicio} onChange={(event) => {setName(event.target.value)}}></input>
      </div>
      <div className={styles.rangoDePrecioParent}>
        <div className={styles.rangoDePrecio}>Rango de precio</div>
        <input className={styles.rectangleDiv} value={rangodePrecio} onChange={(event) => {setPrecio(event.target.value)}}></input>
      </div>
      <div className={styles.rectangleGroup} onClick={() => {onGroupContainer4Click()}}>
        <div className={styles.groupChild2} />
        <div className={styles.agregar}>AGREGAR</div>
      </div>
      <div
        className={styles.rectangleContainer}
        onClick={() => onRectangle1Click()}
      >
        <div className={styles.groupChild3} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
      <div className={styles.logo1} onClick={() => onLogoText1Click()}>
        Logo
      </div>
    </div>
  );
};

export default AgregarServicio;
