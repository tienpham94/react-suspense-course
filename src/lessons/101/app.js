import React from "react";
// 1. Change this static import to a dynamic import, wrapped in React.lazy
const PokemonDetail = React.lazy(() =>import('./pokemon-detail'))

export default function App() {
  return (
    <div>
      {/* 2. Wrap this component in a React.Suspense component with fallback */}
      <React.Suspense fallback="loading pokemon">

      <PokemonDetail />
      </React.Suspense>
    </div>
  );
}
