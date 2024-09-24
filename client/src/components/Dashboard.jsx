import React, { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { User, Heart, Bell } from "lucide-react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const menuItems = [
    { icon: <User size={20} />, label: "Profile", section: "profile" }
  ];

  return (
    <div className="flex h-screen bg-[#FFF0F5]">
      <Sidebar menuItems={menuItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto bg-[#FFF0F5]">
        <Header />
        <Content />
      </main>
    </div>
  );
};

const Sidebar = ({ menuItems, activeSection, setActiveSection }) => (
  <aside className="w-64 bg-[#FF9FB2] text-[#4A0E4E] p-4">
    <div className="flex items-center mb-8">
      <div className="w-8 h-8 bg-[#FF5C8D] rounded-full mr-2 flex items-center justify-center">
        <Heart size={20} className="text-white" />
      </div>
      <h1 className="text-xl font-bold">LoveMatcher</h1>
    </div>
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.section} className="mb-2">
            <button
              className={`flex items-center w-full p-2 rounded hover:bg-[#FF5C8D] hover:text-white transition-colors duration-200 ${
                activeSection === item.section ? "bg-[#FF5C8D] text-white" : ""
              }`}
              onClick={() => setActiveSection(item.section)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end items-center">
        <div className="flex items-center">
          <Bell className="text-[#4A0E4E] mr-4" size={20} />
          <div className="w-8 h-8 bg-[#FF5C8D] rounded-full flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Content = () => (
  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h2 className="text-2xl font-semibold text-[#4A0E4E] mb-6">
      Your Profile
    </h2>
    <ProfileComponent />
  </div>
);

export default Dashboard;