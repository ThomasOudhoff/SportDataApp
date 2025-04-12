import './App.css';
import NavBarComponent from "./Components/NavBar/NavBar.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pagina-componenten
import HomeModule from "./Components/Home/Home.component.js";
import TeamsDetails from "./Components/Teams/TeamsDetails/Teams-details.component.js";
import Footer from "./Components/Footer/Footer.component";
import Login from './Components/Auth/Login/Login.component.js';
import RegisterComponent from "./Components/Auth/Register/Register.component";
import TeamsList from "./Components/Teams/TeamsList/Teams-list.component.js";
import FavoriteTeams from './Components/Teams/FavoriteTeams/Favorite-Teams.component';

// Beveiligde route-wrapper
import { ProtectedRoute } from './Components/Auth/Guard/ProtectedRoute.guard.js';

function App() {
  return (
      <div className="App">
        {/* BrowserRouter zorgt voor navigatie zonder herladen */}
        <BrowserRouter>
          {/* Navigatiebalk bovenin */}
          <NavBarComponent />

          {/* Routes: bepaalt welke component bij welk pad hoort */}
          <Routes>

            {/* Homepagina (vrij toegankelijk) */}
            <Route path="/" element={<HomeModule />} />

            {/* Teamlijst (vrij toegankelijk) */}
            <Route path="/teams" element={<TeamsList />} />

            {/* Teamdetails per ID (vrij toegankelijk) */}
            <Route path="/teams/:id" element={<TeamsDetails />} />

            {/* Loginpagina */}
            <Route path="/auth/login" element={<Login />} />

            {/* Registratiepagina */}
            <Route path="/auth/register" element={<RegisterComponent />} />

            {/* ✅ Alleen favorietenpagina vereist inloggen */}
            <Route path="/favorites" element={
              <ProtectedRoute>
                <FavoriteTeams />
              </ProtectedRoute>
            } />

          </Routes>

          {/* Voettekst onderin elke pagina */}
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;

