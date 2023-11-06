import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  function onAccessing(){
    console.log({userName: userEmail, userPassword: userPassword});
    navigate("/landing-page");
  };

  const onGroupContainer3Click = useCallback(() => {
    navigate("/register-page");
  }, [navigate]);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div className={styles.login}>
      <div className={styles.loginChild} />
      <img className={styles.loginItem} alt="" src="/group-2.svg" />
      <img className={styles.loginItem} alt="" src="/group-2.svg" />
      <div className={styles.rectangleParent} onClick={onAccessing}>
        <div className={styles.groupChild} />
        <div className={styles.ingresar}>INGRESAR</div>
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupItem} />
        <div className={styles.contrasea}>CONTRASEÑA</div>
        <input type="password" className={styles.div} value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></input>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupInner} />
        <div className={styles.usuario}>USUARIO</div>
        <input className={styles.div} value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></input>
      </div>
      <div
        className={styles.aunNoTienesCuentaRegistraParent}
        onClick={onGroupContainer3Click}
      >
        <div className={styles.aunNoTienesContainer}>
          {`Aun no tienes cuenta? `}
          <span className={styles.registrate}>Registrate</span>
          {` `}
        </div>
        <img className={styles.arrowIcon} alt="" src="/arrow-1.svg" />
      </div>
    </div>
  );
};

export default Login;
