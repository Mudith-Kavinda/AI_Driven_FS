import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/main.layout.tsx";
import RootLayout from "./layout/root.layout.tsx";

import HomePage from "./pages/home/home.page.tsx";
import SignInPage from "./pages/sign-in.page.tsx";
import SignUpPage from "./pages/sign-up.page.tsx";
import JobPage from "./pages/job/job.page.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/job/:id",
            element: <JobPage />,
          },
        ],
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
