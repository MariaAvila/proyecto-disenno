import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPageUser.module.css";
import { slide as Menu } from 'react-burger-menu';
import SessionContext from "../context/SessionContext";

const LandingPageUser = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  const onRectangle1Click = useCallback(() => {
    navigate("/administrar-vehiculos");
  }, [navigate]);

  const onRectangle3Click = useCallback(() => {
    navigate("/historial-de-trabajos");
  }, [navigate]);

  return (
    <div className={styles.landingPage}>
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
      <div className={styles.rectangleGroup}>
        <div className={styles.rectangleDiv} onClick={onRectangle1Click} />
        <div className={styles.administrarVehiculos}>Administrar vehiculos</div>
        <img className={styles.lineIcon} alt="" src="/line-13.svg" />
        <img className={styles.groupChild1} alt="" src="/line-13.svg" />
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.rectangleDiv} onClick={onRectangle2Click} />
        <div className={styles.administrarVehiculos}>Trabajos en progreso</div>
        <img className={styles.lineIcon} alt="" src="/line-13.svg" />
        <img className={styles.groupChild1} alt="" src="/line-13.svg" />
      </div>
      <div className={styles.groupDiv}>
        <div className={styles.rectangleDiv} onClick={onRectangle3Click} />
        <div className={styles.administrarVehiculos}>Historial de trabajos</div>
        <img className={styles.lineIcon} alt="" src="/line-13.svg" />
        <img className={styles.groupChild1} alt="" src="/line-13.svg" />
      </div>
    </div>
  );
};

export default LandingPageUser;
