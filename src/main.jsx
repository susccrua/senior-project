import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="w-full h-screen overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>
);
