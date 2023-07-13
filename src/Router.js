import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Global } from "@emotion/react";
import reset from "@src/styles/Reset";
import Error from "./pages/Error";
import Map from "@src/pages/Map";

function Router() {
    return (
        <>
            <Global styles={reset} />
            <Routes>
                {/* <Route exact path="*" element={<Navigate replace to="/login" />} /> */}
                <Route exact path="/error" element={<Error />} />
                <Route exact path="*" element={<Map />} />
            </Routes>
        </>
    );
}

export default Router;
