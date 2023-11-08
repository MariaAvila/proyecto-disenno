import { useCallback } from "react";
import MecanicosContainer from "../components/MecanicosContainer";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPageProfileMenu.module.css";

const LandingPageProfileMenu = () => {
  const navigate = useNavigate();

  const onEditarPerfilTextClick = useCallback(() => {
    // Please sync "Editar Perfil" to the project
  }, []);

  const onCerrarSesinTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.landingPageProfileMenu}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
        <img className={styles.groupItem} alt="" src="/group-41.svg" />
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
      <MecanicosContainer mechanicManagementTitle="Administracion de Mecanicos" />
      <MecanicosContainer
        mechanicManagementTitle="Visualizacion de trabajos"
        propLeft="820px"
        propTop="243px"
      />
      <MecanicosContainer
        mechanicManagementTitle="Cola de vehiculos"
        propLeft="820px"
        propTop="602px"
      />
      <MecanicosContainer
        mechanicManagementTitle="Administracion de servicios"
        propLeft="230px"
        propTop="602px"
      />
      <div className={styles.rectangleGroup}>
        <div className={styles.rectangleDiv} />
        <div className={styles.lineDiv} />
        <div className={styles.groupChild1} />
        <div className={styles.groupChild2} />
        <div className={styles.editarPerfil} onClick={onEditarPerfilTextClick}>
          Editar perfil
        </div>
        <div className={styles.cerrarSesin} onClick={onCerrarSesinTextClick}>
          Cerrar Sesión
        </div>
      </div>
    </div>
  );
};

export default LandingPageProfileMenu;
