import logo from './logo.svg';
import './App.css';
import TeamsModule from "./Modules/Teams/Teams.module";
import NavBarComponent from "./Components/NavBar/NavBar.component";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeModule from "./Modules/Home.module";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBarComponent></NavBarComponent>
            <Routes>
                <Route path="/" element={<HomeModule/>} />
                <Route path="/teams" element={<TeamsModule/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
