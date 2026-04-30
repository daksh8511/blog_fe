import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const hideHeader = [
    "signin",
    "signup",
    "forgotpassword",
    "admin/create",
    "admin/edit",
  ].some((route) => location.pathname.includes(route));
  return (
    <div
      className={`${location.pathname.startsWith("/admin/create") || location.pathname.startsWith("admin/edit") ? "py-0" : "py-10"} max-w-(--breakpoint-xl) mx-auto`}
    >
      {!hideHeader && <Header />}

      <div
        className={
          location?.pathname.includes("admin/create") ||
          location?.pathname.includes("admin/edit")
            ? "mt-0"
            : "mt-20"
        }
      >
        <Outlet />
      </div>

      {!hideHeader && <Footer />}
    </div>
  );
};

export default App;
