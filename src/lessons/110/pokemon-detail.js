import React from "react";
import { fetchPokemon, suspensify } from "./api";

let initialPokemon = suspensify(fetchPokemon(1));

export default function PokemonDetail() {
  let [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  let [startTransition, isPending] = React.useTransition({ timeoutMs: 1000 });
  let pokemon = pokemonResource.read();

  return (
    <div>
      <div>{pokemon.name}</div>

      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            setPokemonResource(suspensify(fetchPokemon(pokemon.id + 1)))
          )
        }
      >
        Next {isPending && "..."}
      </button>
    </div>
  );
}
