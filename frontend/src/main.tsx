import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InternetIdentityProvider } from "ic-use-internet-identity";
import App from "./app";

const queryClient = new QueryClient();

const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.includes('.localhost');
// Priority: explicit VITE_II_URL -> local II from canister id -> mainnet II
const identityProvider = (import.meta as any).env?.VITE_II_URL
  ? (import.meta as any).env.VITE_II_URL
  : (isLocal && (import.meta as any).env?.VITE_CANISTER_ID_INTERNET_IDENTITY
    ? `http://${(import.meta as any).env.VITE_CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
    : "https://identity.ic0.app");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider loginOptions={{ identityProvider }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InternetIdentityProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
