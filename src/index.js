import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CheeseClicker from "./CheeseClicker";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CheeseClicker />
  </StrictMode>
);
