import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar";
import AppSidebar from "../../components/ui/AppSidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />

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