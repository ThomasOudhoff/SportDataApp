import './App.css';
import TeamsModule from "./Components/Teams/TeamsList/Teams-list.component.js";
import NavBarComponent from "./Components/NavBar/NavBar.component";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeModule from "./Components/Home/Home.component.js";
import TeamsDetails from "./Components/Teams/TeamsDetails/Teams-details.component.js";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBarComponent></NavBarComponent>
            <Routes>
                <Route path="/" element={<HomeModule/>} />
                <Route path="/teams" element={<TeamsModule/>} />
                <Route path="/teams/:id" element={<TeamsDetails/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
