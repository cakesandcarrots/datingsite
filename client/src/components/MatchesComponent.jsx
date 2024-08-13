import React, { useState } from "react";
import { Search, Bell, Heart, MessageCircle, User, LogOut } from "lucide-react";
const MatchesComponent = () => {
    const summaryCards = [
      {
        icon: <Heart size={24} />,
        value: "28",
        label: "New Matches",
        color: "bg-[#FF5C8D]",
      },
      {
        icon: <MessageCircle size={24} />,
        value: "152",
        label: "Unread Messages",
        color: "bg-[#B28DFF]",
      },
      {
        icon: <User size={24} />,
        value: "1,024",
        label: "Online Now",
        color: "bg-[#FF9FB2]",
      },
    ];
  
    const users = [
      {
        name: "Sarah Smith",
        age: 28,
        location: "New York, NY",
        lastActive: "2 hours ago",
        compatibility: "95%",
      },
      {
        name: "Mike Johnson",
        age: 32,
        location: "Los Angeles, CA",
        lastActive: "5 mins ago",
        compatibility: "88%",
      },
      {
        name: "Emily Brown",
        age: 26,
        location: "Chicago, IL",
        lastActive: "Just now",
        compatibility: "92%",
      },
      {
        name: "Chris Taylor",
        age: 30,
        location: "Houston, TX",
        lastActive: "1 day ago",
        compatibility: "85%",
      },
      {
        name: "Jessica Lee",
        age: 29,
        location: "Miami, FL",
        lastActive: "3 hours ago",
        compatibility: "90%",
      },
    ];
  
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center"
            >
              <div className={`${card.color} rounded-full p-3 mr-4`}>
                {React.cloneElement(card.icon, { className: "text-white" })}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#4A0E4E]">
                  {card.value}
                </h3>
                <p className="text-[#FF5C8D]">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-[#FF9FB2]">
            <thead className="bg-[#FF9FB2]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A0E4E] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A0E4E] uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A0E4E] uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A0E4E] uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A0E4E] uppercase tracking-wider">
                  Compatibility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#4A0E4E] uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#FFF0F5]">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src="/api/placeholder/40/40"
                        alt=""
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="font-medium text-[#4A0E4E]">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#4A0E4E]">
                    {user.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#4A0E4E]">
                    {user.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#FF5C8D]">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#B28DFF] text-white">
                      {user.compatibility}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-[#FF5C8D] hover:text-[#4A0E4E]">
                      <Heart size={20} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  export default MatchesComponent;