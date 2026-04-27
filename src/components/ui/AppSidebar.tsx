import { Link, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Posts", path: "/admin/posts" },
    { name: "Create Post", path: "/admin/create" },
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
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppSidebar;