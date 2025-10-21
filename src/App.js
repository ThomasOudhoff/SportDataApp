import './App.css';
import NavBarComponent from "./Components/NavBar/NavBar.component";
import { Route, Routes } from "react-router-dom";

// Pagina-componenten
import HomeModule from "./Components/Home/Home.component.js";
import TeamsDetails from "./Components/Teams/TeamsDetails/Teams-details.component.js";
import Footer from "./Components/Footer/Footer.component";
import Login from './Components/Auth/Login/Login.component.js';
import RegisterComponent from "./Components/Auth/Register/Register.component";
import TeamsList from "./Components/Teams/TeamsList/Teams-list.component.js";
import FavoriteTeams from './Components/Teams/FavoriteTeams/Favorite-Teams.component';
import ProtectedRoute from './Components/Auth/ProtectedRoute'; // Beveiligde route-wrapper
//comment zodat ik nieuwe versie kan commiten


function App() {
  return (
      <div className="App">
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<HomeModule />} />
          <Route path="/teams" element={<TeamsList />} />
          <Route path="/teams/:id" element={<TeamsDetails />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<RegisterComponent />} />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <FavoriteTeams />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;

