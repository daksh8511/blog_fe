import { Link, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();

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

      <div className="flex justify-end items-center">
        <ul className="space-y-3 flex gap-3">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded-md transition ${
                  item.match(location.pathname)
                    ? "bg-[#574de5] text-white"
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
