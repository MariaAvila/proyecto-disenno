import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderLoggedIn from "../components/PageHeaderLoggedIn";
import styles from "./RegistrarMecanico.module.css";

const RegistrarMecanico = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Registrar mecanico Burger Menu" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  function onRegister(){
    if(userEmail === "")
      return
    console.log({userEmail: userEmail});
    navigate("/administracion-de-mecanicos");
  }

  function onGroupContainer3Click(){
    navigate("/administracion-de-mecanicos");
  }

  const [userEmail, setUserEmail] = useState("");

  return (
    <div className={styles.registrarMecanico}>
      <PageHeaderLoggedIn
        onGroupIconClick={onGroupIconClick}
        onLogoText1Click={onLogoText1Click}
      />
      <div className={styles.nombreDeUsuarioParent}>
        <div className={styles.nombreDeUsuario}>Nombre de usuario</div>
        <input className={styles.groupChild} value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></input>
      </div>
      <div className={userEmail != "" ? styles.rectangleParent : styles.rectangleParentDisabled} onClick={onRegister}>
        <div className={styles.groupItem} />
        <div className={styles.enviarSolicitud}>ENVIAR SOLICITUD</div>
      </div>
      <div className={styles.rectangleGroup} onClick={onGroupContainer3Click}>
        <div className={styles.groupInner} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
    </div>
  );
};

export default RegistrarMecanico;
