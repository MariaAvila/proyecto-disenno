import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./UpdateSection.module.css";
import { postData } from "../Utils";
import SessionContext from "../context/SessionContext";

const UpdateSection = ({
  mechanicName,
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

  function onChangeDropDown(value){
    postData("http://127.0.0.1:8000/get_work_services", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, work: value}).then((results) =>{
      setServices(results);
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
      <div className={styles.mecanico1}>{!finished ? "El trabajo esta en progreso" : "El trabajo esta terminado"}</div>
      <div className={styles.groupItem} />
      <img
        className={styles.groupInner}
        alt=""
        src={`data:image/jpeg;base64,${image}`}
        style={lineIconStyle}
      />
      <select style={{position:"absolute", left: "750px", top: "98px"}} name="userRole" onChange={(event) => {onChangeDropDown(event.target.value)}}>
          <option value={-1}></option>
          {worksInProgress.map((work) =>
              <option value={work.work_id}>{work.model}</option>
          )}
      </select>
      <select style={{position:"absolute", left: "950px", top: "98px"}} name="userRole" onChange={(event) => {}}>
          <option value={-1}></option>
          {services.map((service) =>
              <option value={service.service_id}>{service.name}</option>
          )}
      </select>
    </div>
  );
};

export default UpdateSection;
