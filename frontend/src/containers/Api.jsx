import { useEffect, useState } from "react";
import api from "../api";

const RickAndMortyApi = () => {

  const [character, setCharacter] = useState([]);

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  
  const getRandomCharacter = async () => {
    const random = randomIntFromInterval(1,826);
    const response = await api.get(`https://rickandmortyapi.com/api/character/${random}`, {});
    setCharacter(response.data);
  };

  useEffect(() => {
    getRandomCharacter()
    //eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <h3>Rick And Morty Api</h3>
      </div>
      <div className="col-md-12 text-center">
        <img src={character.image} alt="imagen"/>
        <h5>Personaje: {character.name}</h5>
        <p>Especie: {character.species}<br/>Tipo: {character.type}<br/>Género:{character.gender}</p>
        <button className="btn btn-success" onClick={getRandomCharacter}>Cargar nuevo personaje aleatoreo</button>
      </div>
    </div>
  );
};

export default RickAndMortyApi;
