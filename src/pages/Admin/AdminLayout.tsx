import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
