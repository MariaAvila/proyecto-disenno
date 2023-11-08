import ServiceCard from "../components/ServiceCard";
import SectionCard from "../components/SectionCard";
import styles from "./EliminarServicioSeleccion.module.css";
import { useState } from "react";

const EliminarServicioSeleccion = () => {

  const [servicios, setServicios] = useState([
    {
      nombreServicio: "Servicio1",
      costoServicio: "10000"
    },
    {
      nombreServicio: "Servicio2",
      costoServicio: "20000"
    },
    {
      nombreServicio: "Servicio3",
      costoServicio: "30000"
    },
    {
      nombreServicio: "Servicio5",
      costoServicio: "50000"
    },
  ])

  return (
    <div className={styles.eliminarServicioSeleccion}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
        <img className={styles.groupItem} alt="" src="/group-41.svg" />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
      </div>
      {
        servicios.map((servicio) =>
          <ServiceCard nombreServicio={servicio.nombreServicio} costoServicio={servicio.costoServicio} />
        )
      }
    </div>
  );
};

export default EliminarServicioSeleccion;
