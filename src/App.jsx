import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { authReady, login } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const { authReadyState, user } = useSelector((state) => state.userState);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(authReady());
    });
  }, []);
  return <>{authReadyState && <RouterProvider router={routes} />}</>;
}

export default App;
