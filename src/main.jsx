
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { MongoAuthProvider } from "./context/MongoAuthContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MongoAuthProvider>
        <App />
      </MongoAuthProvider>
    </AuthProvider>
  </StrictMode>
);
