import "./App.css";
import RickAndMortyApi from "./containers/Api";
import Equipos from "./containers/Equipos";
import Jugadores from "./containers/Jugadores";
import Premios from "./containers/Premios";

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
          <div className="col-md-12">
            <Premios />
          </div>
          <div className="col-md-12">
            <RickAndMortyApi />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
