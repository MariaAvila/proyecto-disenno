// ContenedorConElementos.js
import React, { useState, useEffect, useContext } from 'react';
import styles from './ContenedorConElementos.module.css';
import Boton from "./Boton";
import ButtonStyles from './Boton.module.css';
import { postData } from '../Utils';
import SessionContext from '../context/SessionContext';

const ContenedorConElementos = ({
    informacionVehiculo,
    indexVehiculo,
    onDateChange,
    onChangeDropDown,
    onViewDetails,
    onAddService,
    labelFechaInicio = 'Fecha Estimada de Inicio:',
    labelFechaFin = 'Fecha Estimada de Fin:',
    labelDropdown = 'Dropdown:',
    opcionesDropdown = [
        { value: 'opcion1', label: 'Opción 1' },
        { value: 'opcion2', label: 'Opción 2' },
        { value: 'opcion3', label: 'Opción 3' },
    ],
}) => {
    const [mostrarBotones, setMostrarBotones] = useState(false);
    const [services, setServices] = useState([]);
    const sessionContext = useContext(SessionContext);

    const funcMostrarBotones = () => {
        setMostrarBotones(true);
    };

    function funcOcultarBotones() {
        setMostrarBotones(false);
    };

    const [selectedMechanic, setSelectedMechanic] = useState(-1);

    useEffect(() => {
        postData("http://127.0.0.1:8000/get_work_services", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, work: informacionVehiculo.work_id}).then((results) =>{
            setServices(results);
        });
    }, []);


    useEffect(() => {
        setSelectedMechanic(opcionesDropdown.find((mecanico) => mecanico.user_id === informacionVehiculo.mechanic) ? informacionVehiculo.mechanic : -1);
    }, [opcionesDropdown]);

    return (
        <div>
            <div className={styles.contenedor} onClick={funcMostrarBotones}>
                <div className={styles.elemento}>
                    <label className={styles.label}>{labelFechaInicio}</label>
                    <input className={styles.reactDatePickerWrapper} type="date" id="start" name="trip-start" onChange={(event) => { onDateChange(event.target.value, "start_date", indexVehiculo) }} />
                </div>
                <div className={styles.elemento}>
                    <label className={styles.label}>{labelFechaFin}</label>
                    <input className={styles.reactDatePickerWrapper} type="date" id="start" name="trip-start" onChange={(event) => { onDateChange(event.target.value, "end_date", indexVehiculo) }} />
                </div>
                <div className={styles.elemento}>
                    <label className={styles.label}>{`Modelo: ${informacionVehiculo.model}`}</label>
                </div>
                <div className={styles.elemento}>
                    <label className={styles.label}>{`Placa: ${informacionVehiculo.plate}`}</label>
                </div>
                <div className={styles.elemento}>
                    <label className={styles.label}>{`Dueño: ${informacionVehiculo.owner_name}`}</label>
                </div>
                <div className={styles.elemento}>
                    <label className={styles.label}>{labelDropdown}</label>
                    <select className={styles.reactSelectContainer} name="userRole" value={selectedMechanic} onChange={(event) => {
                        setSelectedMechanic(event.target.value);
                        onChangeDropDown(event.target.value, indexVehiculo);
                    }}>
                        <option value={-1}></option>
                        {opcionesDropdown.map((mecanico) =>
                            <option value={mecanico.user_id}>{mecanico.name}</option>
                        )}
                    </select>
                </div>
                <div style={{left: '1000px', position: "absolute"}}>
                    <ul>
                        {services.map((service) =>{
                            return(
                                <li>{service.name}</li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
            {mostrarBotones && (
                <div className={ButtonStyles.botonContainer}>
                    <Boton onClick={funcOcultarBotones} children={'CANCELAR'} />
                    <Boton onClick={() => {onAddService(informacionVehiculo.work_id)}} children={'AGREGAR SERVICIO'} />
                </div>
            )}
        </div>
    );
};

export default ContenedorConElementos;
