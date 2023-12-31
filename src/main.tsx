import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/styles/index.css";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/pages/Error.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
