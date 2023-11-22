import React from 'react';
import styles from './Boton.module.css'; // Asegúrate de tener un archivo CSS para estilos

const Boton = ({ onClick, children, isButtonDisabled = false }) => {
  return (
    <button className={styles.boton} onClick={onClick} disabled={isButtonDisabled}>
      {children}
    </button>
  );
};

export default Boton;
