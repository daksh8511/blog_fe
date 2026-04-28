import { Link, useLocation, useNavigate } from "react-router-dom";
import UserInfo from "../../store";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = UserInfo();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      match: (pathname: string) => pathname === "/admin/dashboard",
    },
    {
      name: "Posts",
      path: "/admin/posts",
      match: (pathname: string) => pathname.startsWith("/admin/posts"),
    },
    {
      name: "Create/Edit Post",
      path: "/admin/create",
      match: (pathname: string) =>
        pathname === "/admin/create" || pathname.startsWith("/admin/edit"),
    },
  ];

  return (
    <div className="w-64 h-screen border-r p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

      <ul className="space-y-3">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded-md transition ${
                item.match(location.pathname)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        onClick={() => {
          logout();
          localStorage.removeItem("token");
          localStorage.removeItem("auth-storage");

          navigate("/");
        }}
        className={`block px-3 py-2 rounded-md transition hover:bg-gray-100 text-black `}
      >
        Logout
      </Link>
    </div>
  );
};

export default AppSidebar;
