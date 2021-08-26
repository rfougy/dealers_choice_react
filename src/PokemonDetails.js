import React from "react";
import axios from "axios";

class PokemonDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
    };
  }

  async componentDidMount() {
    const pokemon = (
      await axios.get(`api/pokemon/${this.props.selectedPokemonId}`)
    ).data;
    this.setState({ pokemon });
  }

  render() {
    const { pokemon } = this.state;
    return <div>{pokemon.id}</div>;
  }
}

export default PokemonDetails;
