import styles from "./StartPage.module.css";
import Navbar from "../components/NavBar";

const StartPage = ({
  isLoggedIn
}) => {
  return (
    <div className={styles.startPage}>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <div className={styles.messageContainer}>
          Bienvenido a RepairConnect donde te brindamos una solución integral para
          gestionar y optimizar tus necesidades mecánicas!
        </div>
        <img className={styles.imageContainer} alt="" src="/group-4.svg" />
      </div>
    </div>
  );
};

export default StartPage;
