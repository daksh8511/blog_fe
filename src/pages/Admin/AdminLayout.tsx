import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "../../components/ui/AppSidebar";

const AdminLayout = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname.includes("create") || location.pathname.includes("edit");
  return (
    <>
      {!hideSidebar && <AppSidebar />}
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
