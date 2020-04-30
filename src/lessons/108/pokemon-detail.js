import React from "react";
import { fetchPokemon, suspensify } from "./api";

let initialPokemon = suspensify(fetchPokemon(1));

export default function PokemonDetail() {
  let [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  let [startTransition] = React.useTransition();
  // 1. Destructure `startTransition` from `React.useTransition`
  let pokemon = pokemonResource.read();

  return (
    <div>
      <div>{pokemon.name}</div>

      <button
        type="button"
        onClick={() =>
          // 2. Wrap the `setPokemonResource` onClick handler in `startTransition`
          startTransition(() =>
            setPokemonResource(suspensify(fetchPokemon(pokemon.id + 1)))
          )
        }
      >
        Next
      </button>
    </div>
  );
}
