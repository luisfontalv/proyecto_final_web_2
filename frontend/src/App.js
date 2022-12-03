import "./App.css";
import Equipos from "./containers/Equipos";
import Jugadores from "./containers/Jugadores";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Equipos />
          </div>
          <div className="col-md-12">
            <Jugadores />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
