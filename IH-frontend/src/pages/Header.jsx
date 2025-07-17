import { LucideGanttChart, LucideGanttChartSquare } from "lucide-react";
import React, { useState } from "react";
import { Menu } from "lucide-react"; // add Menu icon
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="hidden md:block w-full  h-fit bg-[#FFFFFF]  shadow-2xs p-3 fixed z-90 ">
        <div className="flex justify-between">
          <div className="flex">
            <LucideGanttChartSquare className="bg-[#2563EB] h-[41px] w-[41px] text-white p-[7px]  rounded-2xl " />

            <div className="text-2xl font-bold p-1 ms-2">InvestorHub</div>
          </div>

          <div>
            <ul className="flex space-x-10 p-3 text-[15px] text-[#4B5563] font-medium">
              <li>Project</li>
              <li>Investor</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="flex  m-1 ">
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
            <h1 className="text-[#4B5563]">Login</h1>
            <button className="bg-[#2563EB] w-full p-3 rounded-2xl text-white text-sm">
              Get Started
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 text-[#4B5563]" />
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="mt-3">
            <ul className="flex flex-col space-y-2 p-3 text-center text-[15px] text-[#4B5563] font-medium bg-white border-t">
              <li>Project</li>
              <li>Investor</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
