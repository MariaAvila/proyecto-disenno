import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BigCardSelectorContainer from "../components/BigCardSelectorContainer";
import styles from "./VisualizacionDeTrabajos.module.css";
import { slide as Menu } from 'react-burger-menu'

const VisualizacionDeTrabajos = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    navigate("/historial-de-trabajos");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Visualizacion de trabajos Burger Menu" to the project
  }, []);

  const onGroupContainer2Click = useCallback(() => {
    navigate(
      "/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"
    );
  }, [navigate]);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  return (
    <div className={styles.visualizacionDeTrabajos}>
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
      <BigCardSelectorContainer
        cardTitle="Historial de trabajos"
        onGroupContainer1Click={onGroupContainer1Click}
      />
      <div className={styles.rectangleGroup} onClick={onGroupContainer2Click}>
        <div className={styles.rectangleDiv} />
        <div className={styles.trabajosEnProgreso}>Trabajos en progreso</div>
        <img className={styles.lineIcon} alt="" src="/line-8.svg" />
        <img className={styles.groupChild1} alt="" src="/line-8.svg" />
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default VisualizacionDeTrabajos;
