import styles from "./PageHeaderLoggedIn.module.css";
import { slide as Menu } from 'react-burger-menu'

const PageHeaderLoggedIn = ({ onGroupIconClick, onLogoText1Click }) => {
  return (
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
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default PageHeaderLoggedIn;
