import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BigCardSelectorContainer from "../components/BigCardSelectorContainer";
import styles from "./AdministracionDeMecanicos.module.css";

const AdministracionDeMecanicos = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    navigate("/registrar-mecanico");
  }, [navigate]);

  const onGroupContainer2Click = useCallback(() => {
    navigate("/eliminar-mecanico");
  }, [navigate]);

  const onGroupContainer3Click = useCallback(() => {
    navigate(
      "/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"
    );
  }, [navigate]);

  const onLogoTextClick = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Administracion de mecanicos Burger Menu" to the project
  }, []);

  return (
    <div className={styles.administracionDeMecanicos}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo} onClick={onLogoTextClick}>
          Logo
        </div>
        <img
          className={styles.groupItem}
          alt=""
          src="/group-41.svg"
          onClick={onGroupIconClick}
        />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
      </div>
      <BigCardSelectorContainer
        cardTitle="Registrar Mecanico"
        propLeft="89px"
        onGroupContainer1Click={onGroupContainer1Click}
      />
      <BigCardSelectorContainer
        cardTitle="Eliminar mecanico"
        propLeft="525px"
        onGroupContainer1Click={onGroupContainer2Click}
      />
      <BigCardSelectorContainer
        cardTitle="Asignar mecanico a vehiculo"
        propLeft="961px"
        onGroupContainer1Click={onGroupContainer3Click}
      />
    </div>
  );
};

export default AdministracionDeMecanicos;
