import React, { useEffect } from "react";
import Router from "./Router";
import "./App.css";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";

function App() {
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
