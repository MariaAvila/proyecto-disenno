import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AgregarServicio.module.css";

const AgregarServicio = () => {
  const navigate = useNavigate();

  const onGroupIconClick = useCallback(() => {
    // Please sync "Agregar Servicio Burger Menu" to the project
  }, []);

  const onRectangle1Click = useCallback(() => {
    navigate("/administracion-de-servicios");
  }, []);

  const onRectangle2Click = useCallback(() => {
    // Please sync "Agregar Servicio" to the project
  }, []);

  const onGroupContainer4Click = useCallback(() => {
    if(confirm('Esta seguro que desea agregar el servicio?')){
      alert('Servicio Agregado con Exito');
      console.log({nombreServicio : nombreServicio, rangodePrecio: rangodePrecio});
      navigate("/administracion-de-servicios");
    }
  }, [navigate]);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  const [nombreServicio, setNombreServicio] = useState("");
  const [rangodePrecio, setRangodePrecio] = useState("");

  return (
    <div className={styles.agregarServicio}>
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
      <div className={styles.nombreDeServicioParent}>
        <div className={styles.nombreDeServicio}>Nombre de servicio</div>
        <input className={styles.rectangleDiv} value={nombreServicio} onChange={(event) => setNombreServicio(event.target.value)}></input>
      </div>
      <div className={styles.rangoDePrecioParent}>
        <div className={styles.rangoDePrecio}>Rango de precio</div>
        <input className={styles.rectangleDiv} value={rangodePrecio} onChange={(event) => setRangodePrecio(event.target.value)}></input>
      </div>
      <div className={styles.rectangleGroup} onClick={onGroupContainer4Click}>
        <div className={styles.groupChild2} />
        <div className={styles.agregar}>AGREGAR</div>
      </div>
      <div
        className={styles.rectangleContainer}
        onClick={onRectangle1Click}
      >
        <div className={styles.groupChild3} />
        <div className={styles.cancelar}>CANCELAR</div>
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default AgregarServicio;
