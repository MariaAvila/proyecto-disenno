import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import SessionContext from "../context/SessionContext";

const Login = () => {
  const navigate = useNavigate();
  const sessionContext = useContext(SessionContext);

  function onAccessing(){
    console.log({userName: userEmail, userPassword: userPassword});
    sessionContext.dologin(userEmail, userPassword)
  };

  useEffect(() => {
    if(sessionContext.getUserDetails().role === '2')
      navigate("/landing-page");
    if(sessionContext.getUserDetails().role === '0')
      navigate("/landing-page-user");
  }, [sessionContext.getUserDetails()]);

  const onGroupContainer3Click = useCallback(() => {
    navigate("/register-page");
  }, [navigate]);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <div className={styles.contrasea}>
          CONTRASEÑA
          <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() =>
                  setShowPassword((prev) => !prev)
              }
          /> 
        </div>
        <input 
              type={
                showPassword ? "text" : "password"
              } 
              className={styles.div} value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></input>
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
