import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import styles from './BurgerMenu.module.css';

const BurgerMenu = ({
    isClient,
    isMechanic
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.burgerMenu}>
            <button onClick={toggleMenu} className={styles.burgerButton}>
                <img src="/group-41.svg" />
            </button>
            {isOpen && !isClient && !isMechanic && (
                <Menu className={styles.menu}>
                    <ul>
                        <li>
                            <a style={{ color: "black", fontSize: "25px" }} href='/administracion-de-mecanicos'>Administracion de Mecanicos</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/registrar-mecanico">Registrar Mecanico</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/eliminar-mecanico">Eliminar Mecanico</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Asignar Mecanico</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "25px" }} href='/visualizacion-de-trabajos'>Visualizacion de trabajos</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/historial-de-trabajos">Historial de trabajos</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Trabajos en progreso</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "25px" }} href='/administracion-de-servicios'>Administracion de Servicios</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/agregar-servicio">Agregar servicio</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} href="/editar-servicio">Administracion de precios y servicios</a>
                        </li>
                        <li>
                            <a style={{ color: "black", fontSize: "25px" }} href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Cola de Vehiculos</a>
                        </li>
                    </ul>
                </Menu>
            )}
            { }
        </div>
    );
};

export default BurgerMenu;
