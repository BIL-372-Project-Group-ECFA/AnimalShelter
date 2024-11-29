import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // App.jsx dosyasını import ediyoruz
import { BrowserRouter } from "react-router-dom"; // Router desteği için
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
