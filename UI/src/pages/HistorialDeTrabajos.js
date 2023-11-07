import { useCallback, useState } from "react";
import SectionForm from "../components/SectionForm";
import { useNavigate } from "react-router-dom";
import styles from "./HistorialDeTrabajos.module.css";
import SearchForm from "../components/SearchForm";

const HistorialDeTrabajos = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Historial de trabajos Burger Menu" to the project
  }, []);

  const onGroupContainer9Click = useCallback(() => {
    // Please sync "Historial de trabajos busqueda" to the project
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const [carHistory, setCarHistory] = useState([
    {
      modelo: "Renault Megane 2006",
      dueno: "Francisco Murillo Morgan",
      placa: "619217",
      mecanico: "Emanuel",
      fechaInicio: "11-6-2022",
      fechaFinal: "11-7-2022"
    },
    
  ]);
  
  const [searchParameters, setSearchParameters] = useState({
    modelParameter : "",
    placaParameter : "",
    duenoParameter : "",
    mecanicoParameter : "",
  });

  const [listaMecanicos, setListaMecanicos] = useState(['Emmanuel', "Miguel", "Isaac"]);

  function changePropertyValue(property, value){
    searchParameters[property] = value;
    setSearchParameters(searchParameters);
  }

  function onSearch(){
    console.log(searchParameters);
  }

  return (
    <div className={styles.historialDeTrabajos}>
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
      <div className={styles.busquedaTitulo}>Parametros de Busqueda</div>
        <SearchForm 
          searchParameters={searchParameters}
          onPropertyChange={(property, value) => changePropertyValue(property, value)}
          listaMecanicos={listaMecanicos}
        />
      <div className={styles.ResultadosTitulo}>Resultados:</div>
      {carHistory.map((carro) => 
        <SectionForm informacionVehiculo={carro}/>
      )}
      <div
        className={styles.rectangleContainer}
        onClick={onSearch}
      >
        <div className={styles.groupChild1} />
        <div className={styles.buscar}>BUSCAR</div>
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default HistorialDeTrabajos;
