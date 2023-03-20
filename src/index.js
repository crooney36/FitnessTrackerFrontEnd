import React from "react";
import ReactDOM from "react-dom/client";
import {
  Main,
  Home,
  MyRoutines,
  Register,
  Login,
  Activities,
  Routine,
} from "./components";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<Main />}></Route>)
);

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<RouterProvider router={router}></RouterProvider>);
