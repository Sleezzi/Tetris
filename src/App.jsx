import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
    errorElement: <Error/>
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;