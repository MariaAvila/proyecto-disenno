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
