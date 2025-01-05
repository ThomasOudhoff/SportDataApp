import logo from './logo.svg';
import './App.css';
import Teams from "./Modules/Teams/Teams";
import NavBarComponent from "./Components/NavBar/NavBar.component";

function App() {
  return (
    <div className="App">
        <NavBarComponent></NavBarComponent>
      <Teams></Teams>
    </div>
  );
}

export default App;
