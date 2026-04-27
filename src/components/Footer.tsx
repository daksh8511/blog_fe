import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { FaTwitter } from "react-icons/fa";
import { FaDribbbleSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="gap-x-8 gap-y-10 px-6 py-12 xl:px-0">
          <div className="col-span-full xl:col-span-2 flex justify-between">
            {/* Logo */}
            <h2 className="font-bold">Lumina</h2>
            <div className="flex items-center gap-5 text-muted-foreground">
              <Link to="#" target="_blank">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <FaDribbbleSquare className="h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <FaGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <Separator />
        <div className="mt-8 text-center">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link to="/" target="_blank">
              Lumina
            </Link>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
