import React, { useEffect } from "react";
import Router from "./Router";
import "./App.css";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  const url = new URL(process.env.PUBLIC_URL || "http://localhost");

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
