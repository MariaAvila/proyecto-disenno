import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  function onRegister(){
    let userDetails = {
      userFullName : userFullName,
      userEmail : userEmail,
      userIdentifier : userIdentifier,
      userPassword : userPassword,
      userRole : userRole,
      userShopName : userShopName
    };

    console.log(userDetails);
  }

  const onGroupContainer8Click = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userShopName, setUserShopName] = useState("");
  const [userIdentifier, setUserIdentifier] = useState("");
  const [userRole, setUserRole] = useState({id : 0, role: "client"});

  return (
    <div className={styles.registerPage}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
      </div>
      <img className={styles.registerPageChild} alt="" src="/group-11.svg" />
      <div className={styles.registrate}>Registrate</div>
      <div className={styles.nombreCompletoParent}>
        <div className={styles.nombreCompleto}>Nombre Completo</div>
        <input className={styles.groupItem} value={userFullName} onChange={(event) => setUserFullName(event.target.value)}></input>  
      </div>
      <div className={styles.nombreDeUsuarioParent}>
        <div className={styles.nombreDeUsuario}>Nombre de usuario</div>
        <input className={styles.groupItem} value={userIdentifier} onChange={(event) => setUserIdentifier(event.target.value)}></input>
      </div>
      <div className={styles.contraseaParent}>
        <div className={styles.contrasea}>Contraseña</div>
        <input type="password" className={styles.groupItem} value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></input>
      </div>
      <div className={styles.nombreDeTallerParent}>
        <div className={styles.nombreDeTaller}>Nombre de Taller</div>
        <input className={styles.groupItem} value={userShopName} onChange={(event) => setUserShopName(event.target.value)}></input>
      </div>
      <div className={styles.rolParent}>
        <div className={styles.contrasea}>Rol</div>
        <select className={styles.groupItem} name="userRole" onChange={(event) => setUserRole(event.target.value)}>
          <option value={0}>Client</option>
          <option value={1}>Mechanic</option>
          <option value={2}>User</option>
        </select>
      </div>
      <div className={styles.correoParent}>
        <div className={styles.nombreCompleto}>Correo</div>
        <input className={styles.groupItem} value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></input>
      </div>
      <div className={styles.rectangleGroup} onClick={onRegister}>
        <div className={styles.groupChild5} />
        <div className={styles.registrarte}>Registrarte</div>
      </div>
      <div
        className={styles.iniciarSesinParent}
        onClick={onGroupContainer8Click}
      >
        <div className={styles.iniciarSesin}>Iniciar Sesión</div>
        <img className={styles.arrowIcon} alt="" src="/arrow-2.svg" />
      </div>
    </div>
  );
};

export default RegisterPage;
