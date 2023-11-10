import { useCallback, useContext, useState } from "react";
import styles from "./ServiceCard.module.css";
import { useNavigate } from "react-router-dom";
import { putData } from "../Utils";
import SessionContext from "../context/SessionContext";

const ServiceCard = ({
  nombreServicio,
  costoServicio,
  idServicio,
  ...props
}) => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  function onGroupContainer1Click() {
    if(confirm('Esta seguro que desea eliminar el servicio?')){
      putData("http://127.0.0.1:8000/disable_service", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, service_id: idServicio}).then((results) =>{
        alert("Servicio Eliminado con Exito");
        navigate('/administracion-de-servicios');
      });
    }
  };

  function onGroupContainer2Click () {
    if(confirm('Esta seguro que desea editar el servicio?')){
      putData("http://127.0.0.1:8000/update_service", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, name: servicio, price: costo, service_id: idServicio}).then((results) =>{
        alert("Servicio Editado con Exito");
      });
    }
  };

  function onGroupContainer3Click() {
    setServicio(nombreServicio);
    setCosto(costoServicio);
  };

  const [servicio, setServicio] = useState(nombreServicio);
  const [costo, setCosto] = useState(costoServicio);

  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <input className={styles.servicio1} value={servicio} onChange={(event) => setServicio(event.target.value)}></input>
      <div className={styles.groupItem} />
      <img className={styles.groupInner} alt="" src="/line-8.svg" />
      <img className={styles.lineIcon} alt="" src="/line-8.svg" />
      <div className={styles.rectangleGroup} onClick={onGroupContainer1Click}>
        <div className={styles.rectangleDiv} />
        <div className={styles.eliminar}>ELIMINAR</div>
      </div>
      <div
        className={styles.rectangleContainer}
        onClick={onGroupContainer2Click}
      >
        <div className={styles.rectangleDiv} />
        <div className={styles.editar}>EDITAR</div>
      </div>
      <div className={styles.groupDiv} onClick={onGroupContainer3Click}>
        <div className={styles.groupChild2} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
      <div className={styles.costoXxxxx}>Costo: </div>
      <input className={styles.costoInput} value={costo} onChange={(event) => setCosto(event.target.value)}></input>
    </div>
  );
};

export default ServiceCard;
