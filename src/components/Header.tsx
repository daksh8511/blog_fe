import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, FileText, Settings, BarChart } from "lucide-react";
import UserInfo from "../store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { userInfo, logout } = UserInfo();
  const menus = [
    { label: "Profile", url: "/profile", icon: User },
    { label: "Stories", url: "/admin/stories", icon: FileText },
    { label: "Stats", url: "/admin/stats", icon: BarChart },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
      fixed inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl)
      rounded-full border transition-all duration-300 z-50
      ${scrolled ? "bg-white/30 backdrop-blur-xl shadow-lg border-white/20" : "bg-background"}`}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <div>
          <h2 className="font-bold">Lumina</h2>
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Search..." className="w-48 md:w-64" />

          {userInfo ? (
            <>
              <Bell className="cursor-pointer mx-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  {menus.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      onClick={() => navigate(item.url)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}

                  {/* SETTINGS POPUP LOGIC */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Account Settings</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Manage your profile preferences and account security
                          here.
                        </p>
                        {/* Add your settings form components here */}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      logout();
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => navigate("/signin")}
              className="hidden rounded-full sm:inline-flex"
              variant="outline"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
