import { useContext, useEffect, useState } from "react";
import styles from "./VehicleInformationUser.module.css";
import { postData } from "../Utils";
import SessionContext from "../context/SessionContext";

const VehicleInformationUser = ({
  informacionVehiculo,
  refershCars,
  ...props
}) => {

  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [carPicture, setCarPicture] = useState(informacionVehiculo.image);
  const sessionContext = useContext(SessionContext);

  const modelEditable = <div>
                          Modelo: <input value={carModel} onChange={(event) => {setCarModel(event.target.value)}} style={{fontSize: '25px'}}></input>
                        </div>
  const colorEditable = <div>
                          Color: <input value={carColor} onChange={(event) => setCarColor(event.target.value)} style={{fontSize: '25px'}}></input>
                        </div>

  const placaEditable = <div>
                        Placa: <input value={carPlate} onChange={(event) => setCarPlate(event.target.value)} style={{fontSize: '25px'}}></input>
                      </div>

  function onCreate(){
    postData("http://127.0.0.1:8000/add_car", {auth_token: sessionContext.getAuthToken(), email: sessionContext.getUserDetails().email, model: carModel, color: carColor, plate: carPlate, image: carPicture}).then((results) =>{
      alert("Vehiculo Activado con Exito");
      refershCars();
    });
  }

  function getBase64(file){
    return new Promise(resolve =>{
      let fileInfo;
      let baseUrl = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseUrl = reader.result;
        resolve(baseUrl);
      };
    });
  };

  const onUpload=(value) =>{
    let newCarPic = value.target.files[0];
    getBase64(newCarPic).then((results) =>{
      setCarPicture(results.substring(23, results.length));
    })

  }
  return (
    <div className={styles.rectangleParent} style={{top: props.top}}>
      <div className={styles.groupChild} />
      <div className={styles.modeloRenaultMegane}>
      {informacionVehiculo.newCar ? modelEditable : `Modelo: ${informacionVehiculo.model}`}
      </div>
      <div className={styles.placa619217}>
        {informacionVehiculo.newCar ? placaEditable : `Placa: ${informacionVehiculo.plate}`}
        </div>
      <div className={styles.dueoFranciscoMurillo}>
        {informacionVehiculo.newCar ? colorEditable : `Color: ${informacionVehiculo.color}`}
      </div>
      <div className={styles.crearAuto}>
        {informacionVehiculo.newCar ? <button style={{fontSize: '25px'}} onClick={onCreate}>Crear Auto</button> : ''}
      </div>
      <img className={styles.groupItem} alt="" src={`data:image/jpeg;base64,${carPicture}`} />
      {informacionVehiculo.newCar && <input type='file' className={styles.uploadButton} onChange={onUpload}></input>}
    </div>
  );
};

export default VehicleInformationUser;
