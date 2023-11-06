import RegistrationForm from "../components/RegistrationForm";
import styles from "./StartPage.module.css";

const StartPage = () => {
  return (
    <div className={styles.startPage}>
      <RegistrationForm />
      <div className={styles.bienvenidoARepairconnect}>
        Bienvenido a RepairConnect donde te brindamos una solución integral para
        gestionar y optimizar tus necesidades mecánicas!
      </div>
      <img className={styles.startPageChild} alt="" src="/group-4.svg" />
    </div>
  );
};

export default StartPage;
