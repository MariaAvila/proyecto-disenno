// ContenedorConElementos.js
import React, { useState, useEffect } from 'react';
import styles from './ContenedorConElementos.module.css';
import Boton from "./Boton";
import ButtonStyles from './Boton.module.css';

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

    const funcMostrarBotones = () => {
        setMostrarBotones(true);
    };

    function funcOcultarBotones() {
        setMostrarBotones(false);
    };

    const [selectedMechanic, setSelectedMechanic] = useState(-1);

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
            </div>
            {mostrarBotones && (
                <div className={ButtonStyles.botonContainer}>
                    <Boton onClick={funcOcultarBotones} children={'CANCELAR'} />
                    <Boton onClick={() => {onAddService(informacionVehiculo.work_id)}} children={'AGREGAR SERVICIO'} />
                    <Boton onClick={onViewDetails} children={'VER DETALLES'} />
                </div>
            )}
        </div>
    );
};

export default ContenedorConElementos;
