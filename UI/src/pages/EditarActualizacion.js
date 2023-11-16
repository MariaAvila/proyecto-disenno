import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import BigCardSelectorContainer from "../components/BigCardSelectorContainer";
import styles from "./EditarAcutalizacion.module.css";
import SessionContext from "../context/SessionContext";
import PageHeaderLoggedIn from "../components/PageHeaderLoggedIn";
import { postData } from "../Utils";
import MecanicoSection from "../components/MecanicoSection";
import UpdateSection from "../components/UpdateSection";

const EditarAcutalizacion = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);
  const [worksInProgress, setWorksInProgress] = useState([]);
  

  const onGroupIconClick = useCallback(() => {
    // Please sync "Eliminar mecanico Burger Menu" to the project
  }, []);

  useEffect(() => {
    postData("http://127.0.0.1:8000/get_updates", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, workshop:  parseInt(sessionContext.getUserDetails().workshop_id)}).then((results) =>{
      setUpdatesInformation(results);
    });
  }, []);

  function onDeleteMechanic(mechanic){
    if(confirm(`Esta seguro que desea eliminar al mecanico ${mechanic.name}?`)){
      putData('http://127.0.0.1:8000/disable_user', {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, user_id: mechanic.user_id}).then((results) =>{
        alert('Mecanico elminado con exito');
        navigate("/landing-page");
      });
    }
  }

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const onGroupContainer1Click = useCallback(() => {
    // Please sync "Eliminar mecanico seleccion" to the project
  }, []);

  useEffect(() => {
    postData("http://127.0.0.1:8000/works_in_progress", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, workshop: sessionContext.getUserDetails().workshop_id}).then((results) =>{
      setWorksInProgress(results);
    });
  }, []);

  const [updatesInformation, setUpdatesInformation] = useState([]);

  return (
    <div className={styles.eliminarMecanico}>
      <PageHeaderLoggedIn
        onGroupIconClick={onGroupIconClick}
        onLogoText1Click={onLogoText1Click}
      />
      {updatesInformation.map((update, id) =>{
        return(
          <div key={id} onClick={() => {}}>
            <UpdateSection
              mechanicName={update.update_id}
              worksInProgres={worksInProgress}
              finished={update.is_finished}
              image={update.image}
              propTop={`${id * 300 + 224}px`}
              propCursor="unset"
              propHeight="134.8px"
              propHeight1="134.8px"
            />
          </div>
        );
      })}
    </div>
  );
};

export default EditarAcutalizacion;
