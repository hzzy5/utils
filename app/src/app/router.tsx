import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import { features } from "./features";

export const featureRoutes = features.map((feature) => ({
  path: feature.path,
  lazy: async () => {
    const page = await feature.loadPage();
    return { Component: page.default };
  },
}));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <HomePage /> }, ...featureRoutes],
  },
]);
