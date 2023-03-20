import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./components";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="routines" element={<Routine />} />
      <Route path="activities" element={<Activities />} />
      <Route path="myroutines" element={<MyRoutines />} />
    </Route>
  )
);

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(
  <RouterProvider router={router}>
    <Router />
  </RouterProvider>
);
