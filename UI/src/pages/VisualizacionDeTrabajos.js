import styles from "./VisualizacionDeTrabajos.module.css";
import Navbar from "../components/NavBar";
import ContentCard from "../components/ContentCard";

const VisualizacionDeTrabajos = ({
  isLoggedIn,
  isClient,
  isMechanic
}) => {
  return (
    <div className={styles.administracionDeMecanicos}>
      <Navbar isLoggedIn={isLoggedIn} isClient={isClient} isMechanic={isMechanic}></Navbar>
      <div className={styles.container}>
        <ContentCard to={"/historial-de-trabajos"} title={"Historial de trabajos"}></ContentCard>
        <ContentCard to={"/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"} title={"Trabajos en progreso"}></ContentCard>
      </div>
    </div>
  );
};
//   const navigate = useNavigate();

//   const onGroupContainer1Click = useCallback(() => {
//     navigate("/historial-de-trabajos");
//   }, [navigate]);

//   const onGroupIconClick = useCallback(() => {
//     // Please sync "Visualizacion de trabajos Burger Menu" to the project
//   }, []);

//   const onGroupContainer2Click = useCallback(() => {
//     navigate(
//       "/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"
//     );
//   }, [navigate]);

//   const onLogoText1Click = useCallback(() => {
//     navigate("/landing-page");
//   }, [navigate]);
//       <BigCardSelectorContainer
//         cardTitle="Historial de trabajos"
//         onGroupContainer1Click={onGroupContainer1Click}
//       />
//       <div className={styles.rectangleGroup} onClick={onGroupContainer2Click}>
//         <div className={styles.rectangleDiv} />
//         <div className={styles.trabajosEnProgreso}>Trabajos en progreso</div>
//         <img className={styles.lineIcon} alt="" src="/line-8.svg" />
//         <img className={styles.groupChild1} alt="" src="/line-8.svg" />
//       </div>
//       <div className={styles.logo1} onClick={onLogoText1Click}>
//         Logo
//       </div>
//     </div>
//   );
// };

export default VisualizacionDeTrabajos;
