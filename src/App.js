import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [isPopupVisible, setPopupVisibilty] = useState(false);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);
  const [currentPokemanId, setCurrentPokemanId] = useState(null);

  console.log("selectedPokemonData", selectedPokemonData);

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

  const pokemanCardBtnHandler = (val) => {
    let data = pokemonData[val];
    let id = val + totalPokemon + 1;
    setCurrentPokemanId(id);
    console.log("data", data);
    console.log(val);
    fetch(data.url)
      .then((response) => response.json())
      .then((actualData) => setSelectedPokemonData(actualData));
    setPopupVisibilty(true);
  };
  return (
    <div className="App">
      {isPopupVisible ? (
        <div className="popup">
          <p className="current-pokeman-name">{selectedPokemonData?.name}</p>
          <img
            className="current-pokeman-img"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${currentPokemanId}.svg`}
          ></img>
          <div className="stat-data">
            Stat Data
            {selectedPokemonData?.stats.map(
              ({ base_stat, effort, stat }, id) => (
                <div className="stat-data-card">
                  <div className="state-data-container-name">
                    <p>Name: </p>
                    <p> &nbsp;{stat.name}</p>
                  </div>
                  <div className="state-data-container">
                    <p>Base stat: </p>
                    <p> &nbsp;{base_stat}</p>
                  </div>
                  <div className="state-data-container">
                    <p>Effort: </p>
                    <p> &nbsp;{effort}</p>
                  </div>
                </div>
              )
            )}
          </div>
          <button
            className="popup-close-btn"
            onClick={() => setPopupVisibilty(false)}
          >
            close
          </button>
        </div>
      ) : (
        <>
          <div className="pokeman-view-container">
            {pokemonData &&
              pokemonData.map(({ name }, id) => (
                <div className="pokeman-card" key={id}>
                  <p className="pokeman-name">{name}</p>
                  <img
                    className="pokeman-img"
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                      id + totalPokemon + 1
                    }.svg`}
                  ></img>
                  <button
                    className="pokeman-card-btn"
                    onClick={() => {
                      pokemanCardBtnHandler(id);
                    }}
                  >
                    click to open
                  </button>
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
        </>
      )}
    </div>
  );
}

export default App;
