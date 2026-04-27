import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const hideHeader = ["signin", "signup", "forgotpassword"].some((route) =>
    location.pathname.includes(route),
  );
  return (
    <div className="py-10 max-w-(--breakpoint-xl) mx-auto">
      {!hideHeader && <Header />}

      <div className="mt-20">
        <Outlet />
      </div>

      {!hideHeader && <Footer />}
    </div>
  );
};

export default App;
