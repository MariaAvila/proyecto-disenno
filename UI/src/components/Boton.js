import React from 'react';
import styles from './Boton.module.css'; // Asegúrate de tener un archivo CSS para estilos

const Boton = ({ onClick, children }) => {
  return (
    <button className={styles.boton} onClick={onClick}>
      {children}
    </button>
  );
};

export default Boton;
