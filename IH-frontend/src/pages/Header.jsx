import {
  LogOut,
  LucideGanttChart,
  LucideGanttChartSquare,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Menu } from "lucide-react"; // add Menu icon
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ishome = path === "/";
  const getHeaderTitle = () => {
    if (path.startsWith("/superadmin")) return "Super Admin Dashboard";
    if (path.startsWith("/company")) return "Company Dashboard";
    if (path.startsWith("/investor")) return "Investor Dashboard";
    if (path === "/login") return "Login";
    if (path === "/register") return "Register";
    return "Welcome to Investors Hub";
  };
  return (
    <>
      <div className="hidden md:block w-full  h-fit bg-[#FFFFFF]  shadow-2xs p-3 fixed z-90 ">
        <div className="flex justify-between">
          <div className="flex">
            <LucideGanttChartSquare className="bg-[#2563EB] h-[41px] w-[41px] text-white p-[7px]  rounded-2xl " />

            <div className="text-2xl font-bold p-1 ms-2">InvestorHub</div>
          </div>

          <div>
            {ishome ? (
              <ul className="flex space-x-10 p-3 text-[15px] text-[#4B5563] font-medium">
                <li>Project</li>
                <li>Investor</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            ) : (
              <h1 className="text-3xl  font-bold text-[#333333e0]">
                {getHeaderTitle()}
              </h1>
            )}
          </div>
          <div className="flex  m- ">
            {ishome ? (
              <>
                <Link to="/login">
                  {" "}
                  <h1 className=" p-3 text-[#4B5563] text-[15px] font-medium">
                    Login
                  </h1>
                </Link>
                <Link to="/register">
                  <button className="bg-[#2563EB] p-3 rounded-2xl text-white">
                    Get Started
                  </button>
                </Link>
              </>
            ) : user ? (
              <div className="flex justify-center items-center space-x-2 pr-[50px]">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Logout"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="md:hidden mt-2 fixed p-2 shadow-2xl w-full bg-white z-50">
        <div className="flex justify-between items-center">
          {/* Left: Logo + Title */}
          <div className="flex items-center">
            <LucideGanttChartSquare className="bg-[#2563EB] h-[41px] w-[41px] text-white p-[7px] rounded-2xl" />
            <h1 className="text-2xl font-bold ms-2">InvestorHub</h1>
          </div>

          {/* Right: Hamburger Icon */}
          <div className="flex items-center gap-2">
            {ishome ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  {" "}
                  <h1 className="text-[#4B5563]">Login</h1>
                </Link>
                <Link to="/register">
                  {" "}
                  <button className="bg-[#2563EB] w-full p-3 rounded-2xl text-white text-sm">
                    Get Started
                  </button>
                </Link>
              </div>
            ) : (
              <></>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 text-[#4B5563]" />
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="mt-3">
            <ul className="flex flex-col space-y-2 p-3 text-center text-[15px] text-[#4B5563] font-medium bg-white border-t">
              {user ? (
                <div className="text-[18px] font-bold bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-3">
                  <h1>{user.email}</h1>
                  <h1>{user.role}</h1>
                </div>
              ) : null}
              <li>Project</li>
              <li>Investor</li>
              <li>About</li>
              <li>Contact</li>
              {user ? (
                <button onClick={handleLogout}>
                  {" "}
                  <li>Logout</li>
                </button>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
