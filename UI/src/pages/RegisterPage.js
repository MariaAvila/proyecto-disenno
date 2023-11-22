import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import Navbar from "../components/NavBar";
import { postData } from "../Utils.js"
import Boton from "../components/Boton.js";

const RegisterPage = ({
  isLoggedIn
}) => {
  const navigate = useNavigate();

  function onRegister() {
    let userDetails = {
      name: formData.userFullName,
      email: formData.userEmail,
      password: formData.userPassword,
      role: formData.userRole,
      workshop: formData.userRole === 0 ? 'cliente' : formData.userShopName
    };

    let response = postData('http://127.0.0.1:8000/create_user', userDetails);
    response.then((result) => {
      if (result.response != 'Row created successfully') {
        alert(result.response);
      } else {
        navigate("/login");
      }
    });
  }

  const onGroupContainer8Click = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const [formData, setFormData] = useState({
    userFullName: '',
    userEmail: '',
    userPassword: '',
    userShopName: '',
    userRole: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const [userFullName, setUserFullName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [userShopName, setUserShopName] = useState("");
  // const [userRole, setUserRole] = useState(0);

  return (
    <div className={styles.registerPage}>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <img className={styles.imageContainer} alt="" src="/group-11.svg" />
        <div className={styles.formContainer}>
          <form>
            <div className={styles.registrate}>Registrate</div>
            <label>
              Nombre Completo:
              <input
                type="text"
                name="userFullName"
                value={formData.userFullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Correo:
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
              />
            </label>

            <label>
              Contraseña:
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
              />
            </label>

            <label>
              Rol:
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}>
                <option value={0}>Cliente</option>
                <option value={1}>Mecanico</option>
                <option value={2}>Dueño</option>
              </select>
            </label>

            {formData.userRole == 2 && <label>
              Nombre de Taller:
              <input
                type="text"
                name="userShopName"
                value={formData.userShopName}
                onChange={handleChange}
              />
            </label>}
          <div className={styles.optionsContainer}>
            <div className={styles.registerContainer}>
              <Boton onClick={onRegister} children={"Registrarse"} />
            </div>
            <div className={styles.loginContainer}>
              <a href="/login">Iniciar Sesión</a>
              <img alt="" src="/arrow-2.svg" />
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
