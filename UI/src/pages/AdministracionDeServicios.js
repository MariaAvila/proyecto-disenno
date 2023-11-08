import { useCallback } from "react";
import BigCardSelectorContainer from "../components/BigCardSelectorContainer";
import { useNavigate } from "react-router-dom";
import styles from "./AdministracionDeServicios.module.css";
import { slide as Menu } from 'react-burger-menu'

const AdministracionDeServicios = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    navigate('/agregar-servicio')
  }, []);

  const onGroupContainer2Click = useCallback(() => {
    navigate('/editar-servicio')
  }, []);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Administracion de Servicios Burger Menu" to the project
  }, []);

  const onGroupContainer3Click = useCallback(() => {
    // Please sync "Administracion de precios y servicios" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  return (
    <div className={styles.administracionDeServicios}>
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
        cardTitle="Agregar servicio"
        propLeft="200px"
        onGroupContainer1Click={onGroupContainer1Click}
      />
      <BigCardSelectorContainer
        cardTitle="Administracion de precios y servicios"
        propLeft="800px"
        onGroupContainer1Click={onGroupContainer2Click}
      />
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default AdministracionDeServicios;
