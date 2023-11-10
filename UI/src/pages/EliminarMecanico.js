import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderLoggedIn from "../components/PageHeaderLoggedIn";
import MecanicoSection from "../components/MecanicoSection";
import styles from "./EliminarMecanico.module.css";
import { getData, postData, putData } from "../Utils";
import SessionContext from "../context/SessionContext";

const EliminarMecanico = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Eliminar mecanico Burger Menu" to the project
  }, []);

  useEffect(() => {
    postData("http://127.0.0.1:8000/get_mechanics", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, workshop:  parseInt(sessionContext.getUserDetails().workshop_id)}).then((results) =>{
      setMechanicList(results);
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

  const [mechanicList, setMechanicList] = useState([]);

  return (
    <div className={styles.eliminarMecanico}>
      <PageHeaderLoggedIn
        onGroupIconClick={onGroupIconClick}
        onLogoText1Click={onLogoText1Click}
      />
      {mechanicList.map((mechanic, id) =>{
        return(
          <div key={id} onClick={() => onDeleteMechanic(mechanic)}>
            <MecanicoSection
              mechanicName={mechanic.name}
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

export default EliminarMecanico;
