import { Outlet, useLocation } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar";
import AppSidebar from "../../components/ui/AppSidebar";

const AdminLayout = () => {
  const location = useLocation()
  const hideSidebar =
  location.pathname.includes('create') ||
  location.pathname.includes('edit');
  return (
    <SidebarProvider>
      <div className="flex w-full">
        {
          !hideSidebar && (
            <AppSidebar />
          )
        }

        {/* Main Content */}
        <SidebarInset className="flex-1 z-0">
          {/* Page Content MUST be inside SidebarInset */}
          <div className="p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;