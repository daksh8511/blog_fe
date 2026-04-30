import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import UserInfo from "../store";
import { Bell, LogOut } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { userInfo, logout } = UserInfo();
  const location = useLocation();

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
          {location?.pathname?.startsWith("/admin") ? (
            <div className="flex gap-6">
            <Bell />
            <LogOut className="cursor-pointer" onClick={() => {
              logout()
              localStorage.removeItem('auth-storage')
              localStorage.removeItem('token')
              navigate("/");
            }} />
            </div>
          ) : (
            <>
              <Input placeholder="Search..." />
              {userInfo ? (
                <Avatar onClick={() => navigate(`/admin/dashboard`)}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              ) : (
                <Button
                  onClick={() => navigate("/signin")}
                  className="hidden rounded-full sm:inline-flex"
                  variant="outline"
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
