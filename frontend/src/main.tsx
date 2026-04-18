
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App.tsx";
import AdminResponses from "./app/AdminResponses.tsx";
import "./styles/index.css";

// Generate a random secret route key
const secretRoute = "a7k2m9p5x3j8w1q4";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminResponses />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
  