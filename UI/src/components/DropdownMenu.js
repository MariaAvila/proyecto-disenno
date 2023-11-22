import React, { useContext, useState } from 'react';
import styles from './DropdownMenu.module.css'
import SessionContext from '../context/SessionContext';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sessionContext = useContext(SessionContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownMenu}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        <img className={styles.profileLogo} src="/group-3.svg" />
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <ul>
            <li>
                <a style={{color: "black", fontSize: "25px"}} onClick={() => sessionContext.doLogOut()}>Cerrar Sesion</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
