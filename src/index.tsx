import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import React from "react";
import { TodoProvider } from "./main.tsx";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoProvider>
        <App />
      </TodoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
