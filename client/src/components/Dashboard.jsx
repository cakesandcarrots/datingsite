import React, { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import MatchesComponent from "./MatchesComponent";
import { User, Heart, MessageCircle, Bell, LogOut, Search } from "lucide-react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("matches");

  const menuItems = [
    { icon: <User size={20} />, label: "Profile", section: "profile" },
    { icon: <Heart size={20} />, label: "Matches", section: "matches" },
    {
      icon: <MessageCircle size={20} />,
      label: "Messages",
      section: "messages",
    },
  ];

  return (
    <div className="flex h-screen bg-[#FFF0F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FF9FB2] text-[#4A0E4E] p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-[#FF5C8D] rounded-full mr-2 flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">LoveMatcher</h1>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  className={`flex items-center p-2 rounded hover:bg-[#FF5C8D] hover:text-white transition-colors duration-200 ${
                    activeSection === item.section
                      ? "bg-[#FF5C8D] text-white"
                      : ""
                  }`}
                  onClick={() => setActiveSection(item.section)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#FFF0F5]">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end items-center mb-4">
              <div className="flex items-center">
                <Bell className="text-[#4A0E4E] mr-4" size={20} />
                <img
                  src="/api/placeholder/32/32"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
            <div className="relative">
                <input
                  type="text"
                  placeholder="Search matches"
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-[#FF9FB2] focus:outline-none focus:ring-2 focus:ring-[#FF5C8D]"
                />
                <Search
                  className="absolute left-3 top-2.5 text-[#4A0E4E]"
                  size={20}
                />
              </div>
            </div>
          </div>
        </header>
        <div className="flex w-[100%] justify-between">
          <h2 className="text-2xl font-semibold text-[#4A0E4E] ml-10 mt-3 ">
            {activeSection === 'profile' ? 'Your Profile' : 'Your Love Journey'}
          </h2>
         
        </div>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeSection === "profile" ? <ProfileComponent /> : <MatchesComponent />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
