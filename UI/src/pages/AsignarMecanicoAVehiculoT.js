import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import styles from "./AsignarMecanicoAVehiculoT.module.css";
import SessionContext from "../context/SessionContext";
import { postData, putData } from "../Utils";
import Boton from "../components/Boton";
import Modal from "../components/Modal";
import ButtonStyles from '../components/Boton.module.css';
import ContenedorConElementos from "../components/ContenedorConElementos";

const AsignarMecanicoAVehiculoT = () => {
  const navigate = useNavigate();

  const sessionContext = useContext(SessionContext);

  const onGroupIconClick = useCallback(() => {
    // Please sync "Asignar mecanico a vehiculo/ Trabajos en progreso/ Cola de vehiculos Burger Menu" to the project
  }, []);

  const onCreateWorkClick = useCallback(() => {
    navigate("/agregar-trabajo");
  }, []);

  const onLogoText1Click = useCallback(() => {
    navigate("/landing-page");
  }, [navigate]);

  useEffect(() => {
    postData('http://127.0.0.1:8000/works_in_progress', { auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, workshop: sessionContext.getUserDetails().workshop_id }).then((results) => {
      setUnassignedCars(results);
      console.log(results);
    });
    postData("http://127.0.0.1:8000/get_mechanics", { auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, workshop: parseInt(sessionContext.getUserDetails().workshop_id) }).then((results) => {
      setListaMecanicos(results);
    });
    postData("http://127.0.0.1:8000/get_services", { auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, workshop: parseInt(sessionContext.getUserDetails().workshop_id) }).then((results) => {
      setListaServicios(results);
    });
  }, []);

  const [unassignedCars, setUnassignedCars] = useState([]);
  const [listaMecanicos, setListaMecanicos] = useState([]);
  const [listaServicios, setListaServicios] = useState([]);
  const [selectedService, setSelectedService] = useState(-1);
  const [workIndex, setWorkIndex] = useState(-1);

  function onSave() {
    if (confirm('Esta seguro que desea guardar los cambios?')) {
      unassignedCars.forEach((car) => {
        putData("http://127.0.0.1:8000/update_work", { auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, start_date: car.start_date, end_date: car.end_date, is_finished: 0, mechanic: car.mechanic, work_id: car.work_id }).then((results) => {
          console.log('Done');
        })
      });

      navigate('/administracion-de-mecanicos');
    }
  }

  function onAddServiceWork() {
    let data = {
      auth_token: sessionContext.getAuthToken(),
      email: sessionContext.getUserDetails().email,
      work: workIndex,
      service: selectedService
    }
    postData("http://127.0.0.1:8000/add_service_work", data)
  }

  function onDateChange(date, propertyName, index) {
    unassignedCars[index][propertyName] = date;
  }

  function onChangeDropDown(newValue, index) {
    unassignedCars[index]['mechanic'] = newValue;
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (index) => {
    setModalOpen(true);
    setWorkIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
    setWorkIndex(-1);
    setSelectedService(-1);
  };

  return (
    <div className={styles.asignarMecanicoAVehiculoT}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.logo}>Logo</div>
        <Menu styles={{
          bmMenu: {
            background: 'gray',
          },
          bmBurgerButton: {
            width: "100px",
            height: "100px",
            position: "fixed",
            top: "1px",
            left: "1px"
          }
        }
        }
        >
          <a style={{ color: "black", fontSize: "25px" }} id="registrarmecanico">Administracion de Mecanicos</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/registrar-mecanico">Registrar Mecanico</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/eliminar-mecanico">Eliminar Mecanico</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Asignar Mecanico</a>
          <a style={{ color: "black", fontSize: "25px" }} id="registrarmecanico">Visualizacion de trabajos</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/historial-de-trabajos">Historial de trabajos</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Trabajos en progreso</a>
          <a style={{ color: "black", fontSize: "25px" }} id="registrarmecanico">Administracion de Servicios</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/agregar-servicio">Agregar servicio</a>
          <a style={{ color: "black", fontSize: "20px", left: "50px", position: "relative" }} id="registrarmecanico" href="/editar-servicio">Administracion de precios y servicios</a>
          <a style={{ color: "black", fontSize: "25px" }} id="registrarmecanico" href="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos">Cola de Vehiculos</a>
        </Menu>
        <img
          className={styles.groupItem}
          alt=""
          src="/group-41.svg"
          onClick={onGroupIconClick}
        />
        <img className={styles.groupInner} alt="" src="/group-3.svg" />
        <Menu right styles={{
          bmMenu: {
            background: 'gray',
          },
          bmBurgerButton: {
            width: "100px",
            height: "100px",
            position: "fixed",
            top: "1px",
            left: "1300px"
          }
        }
        }
        >
          <a style={{ color: "black", fontSize: "25px" }} id="registrarmecanico" onClick={() => sessionContext.doLogOut()}>Cerrar Sesion</a>
        </Menu>
      </div>
      {unassignedCars.map((carroSinAsignar, index) =>
        <ContenedorConElementos
          informacionVehiculo={carroSinAsignar}
          indexVehiculo={index}
          onDateChange={(date, property, index) => onDateChange(date, property, index)}
          onChangeDropDown={(newValue, index) => onChangeDropDown(newValue, index)}
          onAddService={(index) => openModal(index)}
          labelFechaInicio='Fecha Estimada de Inicio: '
          labelFechaFin='Fecha Estimada de Fin: '
          labelDropdown='Mecanico: '
          opcionesDropdown={listaMecanicos} />
      )}
      <div className={ButtonStyles.botonContainer}>
        <Boton onClick={onSave} children={'GUARDAR'} />
        <Boton onClick={onCreateWorkClick} children={'AGREGAR TRABAJO'} />
      </div>
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <label>Seleccionar Servicio:</label>
        </div>
        <div>
          <select value={selectedService} onChange={(event) => {
            setSelectedService(event.target.value);
          }}>
            <option value={-1}></option>
            {listaServicios.map((servicio) =>
              <option value={servicio.service_id}>{servicio.name}</option>
            )}
          </select>
        </div>
        <Boton onClick={onAddServiceWork} children={'AGREGAR SERVICIO'} />
      </Modal>
    </div>
  );
};

export default AsignarMecanicoAVehiculoT;
