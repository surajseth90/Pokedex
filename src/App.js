import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [totalPokemon, setTotalPokemon] = useState(0);

  console.log("pokemonData", pokemonData);
  useEffect(() => {
    if (totalPokemon >= 0)
      fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${totalPokemon}`
      )
        .then((response) => response.json())
        .then((actualData) => setPokemonData(actualData.results));
  }, [totalPokemon]);

  const previousBtnHandler = () => {
    let currentNumber = totalPokemon;
    if (currentNumber === 0) {
      return;
    } else if (currentNumber === 1154) {
      currentNumber = currentNumber - 14;
      setTotalPokemon(currentNumber);
    } else {
      currentNumber = currentNumber - 20;
      setTotalPokemon(currentNumber);
    }
  };
  const nextBtnHandler = () => {
    let currentNumber = totalPokemon;
    if (currentNumber === 1154) {
      return;
    } else if (currentNumber === 1140) {
      currentNumber = currentNumber + 14;
      setTotalPokemon(currentNumber);
    } else {
      currentNumber = currentNumber + 20;
      setTotalPokemon(currentNumber);
    }
  };
  return (
    <div className="App">
      <div className="pokeman-view-container">
        {pokemonData &&
          pokemonData.map(({ name }, id) => (
            <div className="pokeman-card" key={id}>
              <img
                className="pokeman-img"
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                  id + totalPokemon + 1
                }.svg`}
              ></img>
              <p className="pokeman-name">{name}</p>
            </div>
          ))}
      </div>
      <div className="btn-container">
        <button className="btn" onClick={previousBtnHandler}>
          previous
        </button>
        <button className="btn" onClick={nextBtnHandler}>
          next
        </button>
      </div>
    </div>
  );
}

export default App;
