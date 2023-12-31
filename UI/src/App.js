import { useContext, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import RegistrarMecanico from "./pages/RegistrarMecanico";
import VisualizacionDeTrabajos from "./pages/VisualizacionDeTrabajos";
import AdministracionDeServicios from "./pages/AdministracionDeServicios";
import HistorialDeTrabajos from "./pages/HistorialDeTrabajos";
import AsignarMecanicoAVehiculoT from "./pages/AsignarMecanicoAVehiculoT";
import EliminarMecanico from "./pages/EliminarMecanico";
import AdministracionDeMecanicos from "./pages/AdministracionDeMecanicos";
import EditarContrasea from "./pages/EditarContrasea";
import LandingPageProfileMenu from "./pages/LandingPageProfileMenu";
import LandingPage from "./pages/LandingPage";
import AgregarServicio from "./pages/AgregarServicio";
import EliminarServicioSeleccion from "./pages/EliminarServicioSeleccion";
import SessionContext from "./context/SessionContext";
import LandingPageUser from "./pages/LandingPageUser";
import LandingPageMechanic from "./pages/LandingPageMechanic";
import AdministrarVehiculos from "./pages/AdministrarVehiculos";
import AgregarVehiculo from "./pages/AgregarVehiculo";
import AgregarTrabajo from "./pages/AgregarTrabajo"
import ManejoActualizaciones from "./pages/ManejoActualizaciones";
import EditarAcutalizacion from "./pages/EditarActualizacion";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/register-page":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/registrar-mecanico":
        title = "";
        metaDescription = "";
        break;
      case "/visualizacion-de-trabajos":
        title = "";
        metaDescription = "";
        break;
      case "/administracion-de-servicios":
        title = "";
        metaDescription = "";
        break;
      case "/historial-de-trabajos":
        title = "";
        metaDescription = "";
        break;
      case "/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos":
        title = "";
        metaDescription = "";
        break;
      case "/eliminar-mecanico":
        title = "";
        metaDescription = "";
        break;
      case "/administracion-de-mecanicos":
        title = "";
        metaDescription = "";
        break;
      case "/editar-contrasea":
        title = "";
        metaDescription = "";
        break;
      case "/landing-page-profile-menu":
        title = "";
        metaDescription = "";
        break;
      case "/landing-page":
        title = "";
        metaDescription = "";
      case "/agregar-servicio":
        title = "";
        metaDescription = "";
        break;
      case "/editar-servicio":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  function verifyIfUserIsLoggedIn() {
    if (sessionContext.getUserDetails()) {
      if (sessionContext.getUserDetails().email != "")
        return true;
    }
    else {
      return false
    }
  }

  function verifyUserIsClient() {
    if (sessionContext.getUserDetails()) {
      if (sessionContext.getUserDetails().role === '0')
        return true;
    }
    else {
      return false
    }
  }

  function verifyUserIsMechanic() {
    if (sessionContext.getUserDetails()) {
      if (sessionContext.getUserDetails().role === '1')
        return true;
    }
    else {
      return false
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<StartPage isLoggedIn={verifyIfUserIsLoggedIn()} />} />
      <Route
        path="/register-page"
        element={<RegisterPage isLoggedIn={verifyIfUserIsLoggedIn()} />} />
      <Route
        path="/login"
        element={<Login />} />
      {verifyIfUserIsLoggedIn() && <Route
        path="/registrar-mecanico"
        element={<RegistrarMecanico isLoggedIn={verifyIfUserIsLoggedIn()} isClient={verifyUserIsClient()} isMechanic={verifyUserIsMechanic()} />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/visualizacion-de-trabajos"
        element={<VisualizacionDeTrabajos isLoggedIn={verifyIfUserIsLoggedIn()} isClient={verifyUserIsClient()} isMechanic={verifyUserIsMechanic()} />}
      />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/administracion-de-servicios"
        element={<AdministracionDeServicios isLoggedIn={verifyIfUserIsLoggedIn()} isClient={verifyUserIsClient()} isMechanic={verifyUserIsMechanic()} />}
      />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/historial-de-trabajos"
        element={<HistorialDeTrabajos />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/asignar-mecanico-a-vehiculo-trabajos-en-progreso-cola-de-vehiculos"
        element={<AsignarMecanicoAVehiculoT isLoggedIn={verifyIfUserIsLoggedIn()} isClient={verifyUserIsClient()} isMechanic={verifyUserIsMechanic()} />}
      />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/agregar-trabajo"
        element={<AgregarTrabajo />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/eliminar-mecanico"
        element={<EliminarMecanico />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/administracion-de-mecanicos"
        element={<AdministracionDeMecanicos isLoggedIn={verifyIfUserIsLoggedIn()} isClient={verifyUserIsClient()} isMechanic={verifyUserIsMechanic()} />}
      />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/editar-contrasea"
        element={<EditarContrasea />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/landing-page-profile-menu"
        element={<LandingPageProfileMenu />}
      />}
      {verifyIfUserIsLoggedIn() && <Route path="/landing-page"
        element={verifyUserIsMechanic() ? <LandingPageMechanic isLoggedIn={verifyIfUserIsLoggedIn()} /> :
          verifyUserIsClient() ? <LandingPageUser isLoggedIn={verifyIfUserIsLoggedIn()} /> :
            <LandingPage isLoggedIn={verifyIfUserIsLoggedIn()} isClient={verifyUserIsClient()} isMechanic={verifyUserIsMechanic()} />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/agregar-servicio"
        element={<AgregarServicio />} />}
      {verifyIfUserIsLoggedIn() && <Route
        path="/editar-servicio"
        element={<EliminarServicioSeleccion />} />}
      {verifyIfUserIsLoggedIn() && verifyUserIsMechanic() && <Route
        path="/manejo-actualizaciones"
        element={<ManejoActualizaciones />} />}
      {verifyIfUserIsLoggedIn() && verifyUserIsClient() && <Route
        path="/administrar-vehiculos"
        element={<AdministrarVehiculos />} />}
      {verifyIfUserIsLoggedIn() && verifyUserIsClient() && <Route
        path="/agregar-vehiculo"
        element={<AgregarVehiculo />} />}
      {verifyIfUserIsLoggedIn() && verifyUserIsMechanic() && <Route
        path="/editar-actualizacion"
        element={<EditarAcutalizacion />} />}
    </Routes>
  );
}
export default App;
