import React, { useReducer } from "react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      selectedPokemonId: "",
    };
  }

  async componentDidMount() {
    const pokemon = (await axios.get("api/pokemon")).data;
    console.log(pokemon);
    this.setState({ pokemon });

    window.addEventListener("hashchange", () => {
      this.setState({ selectedPokemonId: window.location.hash.slice(1) });
    });
  }

  render() {
    const { pokemon, selectedPokemonId } = this.state;
    return (
      <div>
        <h1>PokeBall Go</h1>
        <ul>
          {pokemon.map((singlePokemon) => (
            <li
              className={selectedPokemonId === pokemon.id ? "selected" : ""}
              key={singlePokemon.id}
            >
              <a href={`#${singlePokemon.id}`}>{singlePokemon.name}</a>
            </li>
          ))}
          <li>
            <a href="#"> View All Pokemon</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
