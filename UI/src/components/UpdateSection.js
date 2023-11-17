import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./UpdateSection.module.css";
import { postData, putData } from "../Utils";
import SessionContext from "../context/SessionContext";
import { BsFillXCircleFill, BsCheckCircleFill  } from "react-icons/bs";


const UpdateSection = ({
  updateId,
  propTop,
  propCursor,
  propHeight,
  propHeight1,
  onGroupContainer1Click,
  image,
  finished,
  worksInProgres
}) => {
  const groupDiv1Style = useMemo(() => {
    return {
      top: propTop,
      cursor: propCursor,
    };
  }, [propTop, propCursor]);

  const lineIconStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const lineIcon1Style = useMemo(() => {
    return {
      height: propHeight1,
    };
  }, [propHeight1]);

  const sessionContext = useContext(SessionContext);

  const [worksInProgress, setWorksInProgress] = useState(worksInProgres);
  const [services, setServices] = useState([])
  const [selectedServiceWork, setSelectedServiceWork] = useState(-1);

  function onChangeDropDown(value){
    postData("http://127.0.0.1:8000/get_work_services", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, work: value}).then((results) =>{
      setServices(results);
    });
  }

  function onUpdate(){
    putData("http://127.0.0.1:8000/edit_update", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, update_id: updateId, service_work: selectedServiceWork}).then((results) =>{
      alert("Actualizacion realizada con exito")
    });
  }

  function onSend(){
    putData("http://127.0.0.1:8000/send_update", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, update_id: updateId}).then((results) =>{
      alert("Actualizacion enviada con exito")
    });
  }

  useEffect(() => {

  }, []);

  return (
    <div
      className={styles.rectangleParent}
      onClick={onGroupContainer1Click}
      style={groupDiv1Style}
    >
      <div className={styles.groupChild} />
      <div className={styles.mecanico1}>{!finished ? <BsFillXCircleFill style={{color: "red"}} title="El trabajo se encuentra en progreso"/> : <BsCheckCircleFill style={{color: "green"}} title="El trabajo ha sido terminado"/>}</div>
      <div className={styles.groupItem} />
      <img
        className={styles.groupInner}
        alt=""
        src={`data:image/jpeg;base64,${image}`}
        style={lineIconStyle}
      />
      <label style={{position:"absolute", left: "470px", top: "10px"}}>Vehiculo</label>
      <select style={{position:"absolute", left: "450px", top: "85px", fontSize: "25px"}} name="userRole" onChange={(event) => {onChangeDropDown(event.target.value)}}>
          <option value={-1}></option>
          {worksInProgress.map((work) =>
              <option value={work.work_id}>{work.model}</option>
          )}
      </select>
      <label style={{position:"absolute", left: "730px", top: "10px"}}>Servicio Realizado</label>
      <select style={{position:"absolute", left: "750px", top: "85px", fontSize: "25px"}} name="userRole" onChange={(event) => {setSelectedServiceWork(event.target.value)}}>
          <option value={-1}></option>
          {services.map((service) =>
              <option value={service.services_works_id}>{service.name}</option>
          )}
      </select>
      <button style={{position:"absolute", left: "1050px", top: "85px", fontSize: "25px"}} name="userRole" onClick={() =>{onUpdate()}}>
        Actualizar
      </button>
      <button style={{position:"absolute", left: "1200px", top: "85px", fontSize: "25px"}} name="userRole" onClick={() =>{onSend()}}>
        Enviar
      </button>
    </div>
  );
};

export default UpdateSection;
