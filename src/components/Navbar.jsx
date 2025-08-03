import ConvoLogo from "./skeletons/App-logo";
import { LogOutIcon, User, Menu, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { logout, authUserData } = useAuthStore();

  

  return (
    // Main navbar container with responsive padding
    <div className="navbar bg-base-300 shadow-lg px-4 sm:px-6">
      {/* Navbar Start Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown Menu (visible on small screens) */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <Menu className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            {authUserData && (
              <>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <User className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Logo for larger screens */}
        <Link to="/" className="btn btn-ghost normal-case text-xl hidden sm:flex">
          <ConvoLogo />
        </Link>
      </div>

      {/* Navbar Center Section (for logo on small screens) */}
      <div className="navbar-center sm:hidden">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <ConvoLogo />
        </Link>
      </div>

      {/* Navbar End Section */}
      <div className="navbar-end flex items-center gap-4">
        {/* Theme Toggle Switch */}
        <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </Link>

        {/* Profile and Logout buttons for medium and larger screens */}
        {authUserData && (
          <div className="hidden md:flex items-center gap-1">
            <Link
              className="btn btn-sm transition-colors flex items-center gap-2 text-base font-semibold normal-case hover:bg-base-content/10"
              to="/profile"
            >
              <User className="w-5 h-5 text-base-content hover:text-primary " />
              <span className="text-base-content">Profile</span>
            </Link>

            <button
              className="btn btn-sm flex items-center gap-2 text-base font-semibold normal-case hover:bg-base-content/10"
              onClick={logout}
            >
              <LogOutIcon className="w-5 h-5 text-base-content hover:text-error transition-colors" />
              <span className="text-base-content">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
