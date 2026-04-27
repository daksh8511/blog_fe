import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import {Toaster} from '../src/components/ui/sonner.js'

createRoot(document.getElementById("root")).render(
   <>
    <RouterProvider router={router} />
    <Toaster />
    </>
);