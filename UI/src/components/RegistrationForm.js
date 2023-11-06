import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/register-page");
  }, [navigate]);

  const onIniciarSesinTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.rectangleGroup} onClick={onGroupContainerClick}>
        <div className={styles.groupItem} />
        <div className={styles.registrarse}>Registrarse</div>
      </div>
      <div className={styles.logo}>Logo</div>
      <div className={styles.iniciarSesin} onClick={onIniciarSesinTextClick}>
        Iniciar Sesión
      </div>
    </div>
  );
};

export default RegistrationForm;
