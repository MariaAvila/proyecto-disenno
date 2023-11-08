import { useCallback, useState } from "react";
import styles from "./ServiceCard.module.css";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({
  nombreServicio,
  costoServicio,
  ...props
}) => {
  const navigate = useNavigate();
  const onGroupContainer1Click = useCallback(() => {
    if(confirm('Esta seguro que desea eliminar el servicio?')){
      console.log({nombreServicio: servicio, costoServicio: servicio});
      alert("Servicio Eliminado con Exito");
      navigate('/administracion-de-servicios');
    }
  }, []);

  const onGroupContainer2Click = useCallback(() => {
    if(confirm('Esta seguro que desea editar el servicio?')){
      console.log({nombreServicio: servicio, costoServicio: servicio});
      alert("Servicio Editado con Exito");
      navigate('/administracion-de-servicios');
    }
  }, []);

  const onGroupContainer3Click = useCallback(() => {
    setServicio(nombreServicio);
    setCosto(costoServicio);
  }, []);

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
