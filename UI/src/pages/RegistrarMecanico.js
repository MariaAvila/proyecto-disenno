import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderLoggedIn from "../components/PageHeaderLoggedIn";
import styles from "./RegistrarMecanico.module.css";
import styles2 from "./RegisterPage.module.css";
import SessionContext from "../context/SessionContext";

const RegistrarMecanico = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Registrar mecanico Burger Menu" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  function onRegister(){
    let userDetails = {
      name : userFullName,
      email : userEmail,
      password : userPassword,
      role : 1,
      workshop : SessionContext.getUserDetails().workshop
    };

    let response = postData('http://127.0.0.1:8000/create_user', userDetails );
    response.then((result) => {
      if(result.response != 'Row created successfully'){
        alert(result.response);
      }else{
        navigate("/login");
      }
    });
  }

  function onGroupContainer3Click(){
    navigate("/administracion-de-mecanicos");
  }

  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div className={styles.registrarMecanico}>
      <PageHeaderLoggedIn
        onGroupIconClick={onGroupIconClick}
        onLogoText1Click={onLogoText1Click}
      />
      <div className={styles2.nombreCompletoParent}>
        <div className={styles2.nombreCompleto}>Nombre Completo</div>
        <input className={styles2.groupItem} value={userFullName} onChange={(event) => setUserFullName(event.target.value)}></input>  
      </div>
      <div className={styles2.contraseaParent}>
        <div className={styles2.contrasea}>Contraseña</div>
        <input type="password" className={styles2.groupItem} value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></input>
      </div>
      <div className={styles2.correoParent}>
        <div className={styles2.nombreCompleto}>Correo</div>
        <input className={styles2.groupItem} value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></input>
      </div>
      <div className={userEmail != "" ? styles.rectangleParent : styles.rectangleParentDisabled} onClick={onRegister}>
        <div className={styles.groupItem} />
        <div className={styles.enviarSolicitud}>CREAR MECANICO</div>
      </div>
      <div className={styles.rectangleGroup} onClick={onGroupContainer3Click}>
        <div className={styles.groupInner} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
    </div>
  );
};

export default RegistrarMecanico;
