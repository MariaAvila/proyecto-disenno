import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AgregarVehiculo.module.css";
import { slide as Menu } from 'react-burger-menu';
import SessionContext from "../context/SessionContext";

const AgregarVehiculo = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  const onGroupContainer1Click = useCallback(() => {
    // Please sync "Agregar vehiculo datos" to the project
  }, []);

  const onGroupContainer2Click = useCallback(() => {
    // Please sync "Agregar vehiculo datos" to the project
  }, []);

  const onGroupContainer3Click = useCallback(() => {
    // Please sync "Agregar vehiculo datos" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const onRectangle7Click = useCallback(() => {
    // Please sync "Agregar vehiculo datos" to the project
  }, []);

  return (
    <div className={styles.agregarVehiculo}>
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
      </div>
      <div className={styles.modeloParent} onClick={onGroupContainer1Click}>
        <div className={styles.modelo}>Modelo</div>
        <div className={styles.rectangleDiv} />
      </div>
      <div className={styles.colorParent} onClick={onGroupContainer2Click}>
        <div className={styles.color}>Color</div>
        <div className={styles.rectangleDiv} />
      </div>
      <div className={styles.placaParent} onClick={onGroupContainer3Click}>
        <div className={styles.color}>Placa</div>
        <div className={styles.rectangleDiv} />
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupChild3} />
        <div className={styles.agregar}>AGREGAR</div>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupChild4} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
      <div className={styles.groupDiv}>
        <div className={styles.groupChild5} />
        <img className={styles.lineIcon} alt="" src="/line-13.svg" />
        <img className={styles.groupChild6} alt="" src="/line-13.svg" />
        <div className={styles.rectangleParent1}>
          <div className={styles.groupChild7} onClick={onRectangle7Click} />
          <div className={styles.seleccionarFoto}>SELECCIONAR FOTO</div>
        </div>
      </div>
    </div>
  );
};

export default AgregarVehiculo;
