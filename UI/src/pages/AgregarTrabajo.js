import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderLoggedIn from "../components/PageHeaderLoggedIn";
import styles from "./RegistrarMecanico.module.css";
import styles2 from "./RegisterPage.module.css";
import SessionContext from "../context/SessionContext";
import { postData } from "../Utils";

const AgregarTrabajo = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Registrar mecanico Burger Menu" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  function onAddWork(){
    let workDetails = {
      auth_token: sessionContext.getAuthToken(), 
      email: sessionContext.getUserDetails().email, 
      plate: carPlate,
      workshop : sessionContext.getUserDetails().workshop_id
    };

    let response = postData('http://127.0.0.1:8000/add_work', workDetails );
    response.then((result) => {
      if(result.response != 'Work added successfully'){
        alert(result.response);
      }else{
        navigate("/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos");
      }
    });
  }

  function onGroupContainer3Click(){
    navigate("/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos");
  }

  const [carPlate, setCarPlate] = useState("");

  let sessionContext = useContext(SessionContext);

  return (
    <div className={styles.registrarMecanico}>
      <PageHeaderLoggedIn
        onGroupIconClick={onGroupIconClick}
        onLogoText1Click={onLogoText1Click}
      />
      <div className={styles2.nombreCompletoParent}>
        <div className={styles2.nombreCompleto}>Placa del Automovil</div>
        <input className={styles2.groupItem} value={carPlate} onChange={(event) => setCarPlate(event.target.value)}></input>  
      </div>
      <div className={carPlate != "" ? styles.rectangleParent : styles.rectangleParentDisabled} onClick={onAddWork}>
        <div className={styles.groupItem} />
        <div className={styles.enviarSolicitud}>AGREGAR TRABAJO</div>
      </div>
      <div className={styles.rectangleGroup} onClick={onGroupContainer3Click}>
        <div className={styles.groupInner} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
    </div>
  );
};

export default AgregarTrabajo;
