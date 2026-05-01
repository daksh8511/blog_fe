import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import UserInfo from "../store";
import { Bell, User, FileText, Settings, BarChart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { userInfo, logout } = UserInfo();
  const menus = [
    { label: "Profile", url: "/13yh12ui3-123123n12k", icon: User },
    { label: "Stories", url: "/admin/stories", icon: FileText },
    { label: "Stats", url: "/admin/stats", icon: BarChart },
    { label: "Settings", url: "/admin/settings", icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl)
        rounded-full border transition-all duration-300 z-50
        ${
          scrolled
            ? "bg-white/30 backdrop-blur-xl shadow-lg border-white/20"
            : "bg-background"
        }
      `}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <div>
          <h2>Lumina</h2>
        </div>

        <div className="flex items-center gap-3">
          <>
            <div className="flex items-center gap-3">
              <Input placeholder="Search..." className="w-48 md:w-64" />

              {userInfo ? (
                <>
                  <Bell className="cursor-pointer mx-2" />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="profile"
                        />
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-xl"
                    >
                      {menus.map((item) => {
                        const Icon = item.icon;
                        return (
                          <DropdownMenuItem
                            key={item.label}
                            onClick={() => navigate(item.url)}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {item.label}
                          </DropdownMenuItem>
                        );
                      })}

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => {
                          logout();
                          localStorage.removeItem("auth-storage");
                          localStorage.removeItem("token");
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
          </>
        </div>
      </div>
    </nav>
  );
};

export default Header;
