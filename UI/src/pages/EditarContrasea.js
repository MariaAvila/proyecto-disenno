import { useCallback } from "react";
import styles from "./EditarContrasea.module.css";

const EditarContrasea = () => {
  const onGroupContainer4Click = useCallback(() => {
    // Please sync "Editar contraseña" to the project
  }, []);

  const onGroupContainer5Click = useCallback(() => {
    // Please sync "Editar Perfil" to the project
  }, []);

  return (
    <div className={styles.editarContrasea}>
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
      <div className={styles.contraseaActualParent}>
        <div className={styles.contraseaActual}>Contraseña actual</div>
        <div className={styles.rectangleDiv} />
      </div>
      <div className={styles.contraseaNuevaParent}>
        <div className={styles.contraseaActual}>Contraseña nueva</div>
        <div className={styles.rectangleDiv} />
      </div>
      <div className={styles.confirmarContraseaParent}>
        <div className={styles.confirmarContrasea}>Confirmar contraseña</div>
        <div className={styles.rectangleDiv} />
      </div>
      <div className={styles.rectangleGroup} onClick={onGroupContainer4Click}>
        <div className={styles.groupChild3} />
        <div className={styles.guardar}>GUARDAR</div>
      </div>
      <div
        className={styles.rectangleContainer}
        onClick={onGroupContainer5Click}
      >
        <div className={styles.groupChild4} />
        <div className={styles.guardar}>CANCELAR</div>
      </div>
    </div>
  );
};

export default EditarContrasea;
