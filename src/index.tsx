import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppV2 from "./AppFunc";

const rootElement = document.getElementById("root") as any
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <div>
            <AppV2 />
        </div>
    </StrictMode>
);
