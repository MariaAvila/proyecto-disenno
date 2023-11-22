import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrarMecanico.module.css";
import styles2 from "./RegisterPage.module.css";
import SessionContext from "../context/SessionContext";
import { postData } from "../Utils";
import Navbar from "../components/NavBar";
import Boton from "../components/Boton";

const RegistrarMecanico = ({
  isLoggedIn,
  isClient,
  isMechanic
}) => {
  const navigate = useNavigate();

  function onRegister() {
    let userDetails = {
      name: userFullName,
      email: userEmail,
      password: userPassword,
      role: 1,
      workshop: sessionContext.getUserDetails().workshop
    };

    let response = postData('http://127.0.0.1:8000/create_user', userDetails);
    response.then((result) => {
      if (result.response != 'Row created successfully') {
        alert(result.response);
      } else {
        alert(result.response);
        navigate("/administracion-de-mecanicos");
      }
    });
  }

  function onCancel() {
    navigate("/administracion-de-mecanicos");
  }

  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  let sessionContext = useContext(SessionContext);

  return (
    <div className={styles.registrarMecanico}>
      <Navbar isLoggedIn={isLoggedIn} isClient={isClient} isMechanic={isMechanic}></Navbar>
      <div style={{ padding: '20px' }} className={styles2.nombreCompletoParent}>
        <div className={styles2.nombreCompleto}>Nombre Completo</div>
        <input className={styles2.groupItem} value={userFullName} onChange={(event) => setUserFullName(event.target.value)}></input>
      </div>
      <div style={{ padding: '20px' }} className={styles2.contraseaParent}>
        <div className={styles2.contrasea}>Contraseña</div>
        <input type="password" className={styles2.groupItem} value={userPassword} onChange={(event) => setUserPassword(event.target.value)}></input>
      </div>
      <div style={{ padding: '20px' }} className={styles2.correoParent}>
        <div className={styles2.nombreCompleto}>Correo</div>
        <input className={styles2.groupItem} value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></input>
      </div>
      <div className={styles.container}>
        <Boton onClick={onRegister} children={'CREAR MECANICO'} isButtonDisabled={userFullName == "" || userEmail == "" || userPassword == ""} />
        <Boton onClick={onCancel} children={'CANCELAR'} />
      </div>
    </div>
  );
};

export default RegistrarMecanico;
