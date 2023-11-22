import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './NavBar.module.css';
import Boton from './Boton';
import BurgerMenu from './BurgerMenu';
import DropdownMenu from './DropdownMenu';

const Navbar = ({
    isLoggedIn,
    isClient,
    isMechanic
}) => {
    const navigate = useNavigate();

    const onRegister = useCallback(() => {
        navigate("/register-page");
    }, [navigate]);

    return (
        <nav>
            {isLoggedIn ? (
                // Render these elements if the user is logged in
                <>
                    <div className={styles.container}>
                        <div className={styles.logoContainer}>
                            <BurgerMenu isClient={isClient} isMechanic={isMechanic}></BurgerMenu>
                            <a className={styles.logo} href='/landing-page'>Logo</a>
                        </div>
                        <div className={styles.optionsContainer}>
                            <DropdownMenu></DropdownMenu>
                        </div>
                    </div>
                </>
            ) : (
                // Render these elements if the user is not logged in
                <>
                    <div className={styles.container}>
                        <div className={styles.logoContainer}>
                            <a className={styles.logo} href='/'>Logo</a>
                        </div>
                        <div className={styles.optionsContainer}>
                            <a href="/login">Iniciar Sesión</a>
                            <Boton onClick={onRegister} children={'Registrarse'} />
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
