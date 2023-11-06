import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderLoggedIn from "../components/PageHeaderLoggedIn";
import MecanicoSection from "../components/MecanicoSection";
import styles from "./EliminarMecanico.module.css";

const EliminarMecanico = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Eliminar mecanico Burger Menu" to the project
  }, []);

  function onDeleteMechanic(mechanicUsername){
    console.log(mechanicUsername);
    navigate("/landing-page");
  }

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const onGroupContainer1Click = useCallback(() => {
    // Please sync "Eliminar mecanico seleccion" to the project
  }, []);

  const [mechanicList, setMechanicList] = useState(['mech1', 'mech2', 'mech3', 'mech4', 'mech5', 'etc']);

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
              mechanicName={mechanic}
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
