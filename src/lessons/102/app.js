import React from "react";
// 1. Create an import error by giving React.lazy a Promise.reject()
const PokemonDetail = React.lazy(() => Promise.reject());

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback
    }

    return this.props.children;
  }
}

// 2. Check the console for errors about error boundaries

// 3-5. Copy/Paste an ErrorBoundary declaration here and configuer with a fallback= prop
//    https://reactjs.org/docs/error-boundaries.html

export default function App() {
  return (
    <div>
      {/* 6. Wrap your Suspense Component in the freshly minted ErrorBoundary component */}
      <ErrorBoundary fallback="Couldn't catch em all">
        <React.Suspense fallback={"Loading your Pokemon..."}>
          <PokemonDetail />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
