import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Blog from "./pages/Blog/Blog.tsx";
import Home from "./pages/Home/Home.tsx";
import Signin from "./pages/Signin/Signin.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import ForgotPassowrd from "./pages/ForgotPassword/ForgotPassword.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AdminLayout from "./pages/Admin/AdminLayout.tsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.tsx";
import PostManagment from "./pages/Admin/PostManagment/PostMangment.tsx";
import CreateOrEditPost from "./pages/Admin/CreateOrEditPost/CreateOrEditPost.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassowrd />,
      },
      {
        path: "blog/:id",
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "posts",
            element: <PostManagment />,
          },
          {
            path: "create",
            element: <CreateOrEditPost />,
          },
          {
            path: "edit/:id",
            element: <CreateOrEditPost />,
          },
        ],
      },
    ],
  },
]);
