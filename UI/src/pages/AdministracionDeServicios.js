import { useCallback } from "react";
import BigCardSelectorContainer from "../components/BigCardSelectorContainer";
import { useNavigate } from "react-router-dom";
import styles from "./AdministracionDeServicios.module.css";

const AdministracionDeServicios = () => {
  const navigate = useNavigate();

  const onGroupContainer1Click = useCallback(() => {
    // Please sync "Agregar Servicio" to the project
  }, []);

  const onGroupContainer2Click = useCallback(() => {
    // Please sync "Trabajo frecuentes" to the project
  }, []);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Administracion de Servicios Burger Menu" to the project
  }, []);

  const onGroupContainer3Click = useCallback(() => {
    // Please sync "Administracion de precios y servicios" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  return (
    <div className={styles.administracionDeServicios}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
        <img
          className={styles.groupItem}
          alt=""
          src="/group-41.svg"
          onClick={onGroupIconClick}
        />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
      </div>
      <BigCardSelectorContainer
        cardTitle="Agregar servicio"
        propLeft="89px"
        onGroupContainer1Click={onGroupContainer1Click}
      />
      <BigCardSelectorContainer
        cardTitle="Trabajos frecuentes"
        propLeft="525px"
        onGroupContainer1Click={onGroupContainer2Click}
      />
      <div className={styles.rectangleGroup} onClick={onGroupContainer3Click}>
        <div className={styles.rectangleDiv} />
        <div className={styles.administracionDePrecios}>
          Administracion de precios y servicios
        </div>
        <img className={styles.lineIcon} alt="" src="/line-8.svg" />
        <img className={styles.groupChild1} alt="" src="/line-8.svg" />
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default AdministracionDeServicios;
