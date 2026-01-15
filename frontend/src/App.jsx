import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OutletComponent from "./pages/OutletComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletComponent />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/edit/:id",
            element: <EditUser />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
