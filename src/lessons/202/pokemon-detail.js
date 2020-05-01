import React from "react";
import { DelaySpinner } from "./ui";
import { PokemonContext } from "./pokemon";

export default function PokemonDetail() {
  let { pokemon: resource, isStale } = React.useContext(PokemonContext);
  let pokemon = resource.read();

  return (
    <div>
      <div style={isStale ? { opacity: 0.5 } : null}>
        {pokemon.name}
        {isStale && <DelaySpinner />}
      </div>
    </div>
  );
}
