import React from "react";
import ReactDOM from "react-dom";

// ↓↓↓ 👋 Update this line to change the lesson number ↓↓↓
import Lesson from "./lessons/201/app";

function App() {
  return <Lesson />;
}

const rootElement = document.getElementById("root");

// ReactDOM.render(<App />, rootElement); // Blocking Mode
ReactDOM.createRoot(rootElement).render(<App />); // Concurrent Mode
