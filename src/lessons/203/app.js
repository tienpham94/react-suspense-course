import React from "react";
import ErrorBoundary from "./error-boundary";
import { fetchPokemon, fetchPokemonCollection, suspensify } from "./api";

const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

let initialPokemon = suspensify(fetchPokemon(1));
let initialCollection = suspensify(fetchPokemonCollection());

function PokemonCollection({ resource as: As, renderItem }) {
  return <As>{initialCollection.read().results.map(renderItem)}</As>;
}

export default function App() {
  let [pokemon, setPokemon] = React.useState(initialPokemon);
  let [collectionResource, setCollectionResource] = React.useState(
    initialPokemon
  );
  let deferredPokemon = React.useDeferredValue(pokemon, {
    timeoutMs: 3000
  });
  let deferredPokemonIsStale = deferredPokemon !== pokemon;
  let [startTransition] = React.useTransition();

  return (
    <div>
      <h1>Pokedex</h1>

      <React.SuspenseList revealOrder="forwards" tail="collapsed">
        <React.Suspense fallback={<div>Fetching Pokemon...</div>}>
          <ErrorBoundary fallback={"Couldn't catch 'em all."}>
            <PokemonDetail
              resource={deferredPokemon}
              isStale={deferredPokemonIsStale}
            />

            <button
              type="button"
              disabled={deferredPokemonIsStale}
              onClick={() =>
                startTransition(() =>
                  setPokemon(
                    suspensify(fetchPokemon(deferredPokemon.read().id + 1))
                  )
                )
              }
            >
              Next
            </button>
          </ErrorBoundary>
        </React.Suspense>

        <React.Suspense fallback={<div>Fetching the Database...</div>}>
          <ErrorBoundary fallback={"Couldn't catch 'em all."}>
            <PokemonCollection
              resource={collectionResource}
              as="ul"
              renderItem={pokemon => (
                <li key={pokemon.name}>
                  <button
                    type="button"
                    onClick={() =>
                      startTransition(() =>
                        setPokemon(suspensify(fetchPokemon(pokemon.id)))
                      )
                    }
                  >
                    {pokemon.name}
                  </button>
                </li>
              )}
            />
          </ErrorBoundary>
        </React.Suspense>
      </React.SuspenseList>
    </div>
  );
}
