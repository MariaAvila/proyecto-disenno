import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import BigCardSelectorContainer from "../components/BigCardSelectorContainer";
import styles from "./AdministracionDeMecanicos.module.css";

const AdministracionDeMecanicos = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    navigate("/registrar-mecanico");
  }, [navigate]);

  const onGroupContainer2Click = useCallback(() => {
    navigate("/eliminar-mecanico");
  }, [navigate]);

  const onGroupContainer3Click = useCallback(() => {
    navigate(
      "/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"
    );
  }, [navigate]);

  const onLogoTextClick = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Administracion de mecanicos Burger Menu" to the project
  }, []);

  return (
    <div className={styles.administracionDeMecanicos}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo} onClick={onLogoTextClick}>
          Logo
        </div>
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
      </div>
      <BigCardSelectorContainer
        cardTitle="Registrar Mecanico"
        propLeft="89px"
        onGroupContainer1Click={onGroupContainer1Click}
      />
      <BigCardSelectorContainer
        cardTitle="Eliminar mecanico"
        propLeft="525px"
        onGroupContainer1Click={onGroupContainer2Click}
      />
      <BigCardSelectorContainer
        cardTitle="Asignar mecanico a vehiculo"
        propLeft="961px"
        onGroupContainer1Click={onGroupContainer3Click}
      />
    </div>
  );
};

export default AdministracionDeMecanicos;
