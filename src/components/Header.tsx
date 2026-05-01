import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, FileText, Settings, BarChart } from "lucide-react";
import UserInfo from "../store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"; // Import Popover
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
import Texts from "../alltexts/Texts";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { userInfo, logout } = UserInfo();

  // Mock Notifications
  const notifications = [
    { id: 1, text: "Someone liked your story", time: "2m ago" },
    { id: 2, text: "New follower: Alex Doe", time: "1h ago" },
    { id: 3, text: "System update completed", time: "5h ago" },
  ];

  const menus = [
    { label: "Profile", url: "/4", icon: User },
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
          <h2 className="font-bold">{Texts.common.Lumina}</h2>
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Search..." className="w-48 md:w-64" />

          {userInfo ? (
            <>
              {/* NOTIFICATION POPOVER */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer p-2 hover:bg-accent rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-500" />
                  </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
                    <h4 className="text-sm font-semibold">Notifications</h4>
                    <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-muted-foreground">
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className="flex flex-col gap-1 border-b p-4 hover:bg-accent/50 cursor-pointer transition-colors last:border-0">
                          <p className="text-sm">{n.text}</p>
                          <span className="text-[10px] text-muted-foreground uppercase font-medium">{n.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        No new notifications
                      </div>
                    )}
                  </div>
                  <div className="border-t p-2 text-center">
                    <Button variant="ghost" className="w-full text-xs h-8">View All</Button>
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </DropdownMenuTrigger>
                {/* ... rest of your DropdownMenuContent */}
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Settings className="mr-2 h-4 w-4" />
                        {Texts.common.Settings}
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{Texts.common.AccountSettings}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-sm text-muted-foreground">
                        Manage your preferences here.
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
                    {Texts.common.Logout}
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
              {Texts.common.Signin}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;