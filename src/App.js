import './App.css';
import NavBarComponent from "./Components/NavBar/NavBar.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeModule from "./Components/Home/Home.component.js";
import TeamsDetails from "./Components/Teams/TeamsDetails/Teams-details.component.js";
import Footer from "./Components/Footer/Footer.component";
import Login from './Components/Auth/Login/Login.component.js';
import { ProtectedRoute } from './Components/Auth/Guard/ProtectedRoute.guard.js';
import TeamsList from "./Components/Teams/TeamsList/Teams-list.component.js";
import RegisterComponent from "./Components/Auth/Register/Register.component";
import FavoriteTeams from './Components/Teams/FavoriteTeams/Favorite-Teams.component';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarComponent></NavBarComponent>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomeModule />
            </ProtectedRoute>
          } />
          <Route path="/teams" element={
            <ProtectedRoute>
              <TeamsList />
            </ProtectedRoute>
          } />
          <Route path="/teams/:id" element={
            <ProtectedRoute>
              <TeamsDetails />
            </ProtectedRoute>
          } />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<RegisterComponent />} />
          <Route path="/favorites" element={<FavoriteTeams />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
