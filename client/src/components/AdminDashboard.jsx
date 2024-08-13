import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Bell, Users, MessageSquare, Settings, FileText, BarChart, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    newUsers: 0,
    recentUsers: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard-data');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const updateStatus = async (userId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}/status`, { status });
      setDashboardData(prevState => ({
        ...prevState,
        recentUsers: prevState.recentUsers.map(user =>
          user._id === userId ? { ...user, status: parseInt(status) } : user
        )
      }));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const menuItems = [
    { icon: <Users size={20} />, label: 'User Management' },
    { icon: <MessageSquare size={20} />, label: 'Support Tickets' },
    { icon: <FileText size={20} />, label: 'Reports' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  const calculateUserAcceptancePercentage = () => {
    const verifiedUsers = dashboardData.recentUsers.filter(user => user.status === 1).length;
    const totalUsers = dashboardData.totalUsers;
    return totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(2) : 0;
  };

  const userAcceptancePercentage = calculateUserAcceptancePercentage();

  const summaryCards = [
    { icon: <Users size={24} />, value: dashboardData.totalUsers, label: 'Total Users', color: 'bg-blue-600' },
    { icon: <MessageSquare size={24} />, value: dashboardData.newUsers, label: 'Unverified Users', color: 'bg-green-600' },
    { icon: <BarChart size={24} />, value: `${userAcceptancePercentage}%`, label: 'User Acceptance Percentage', color: 'bg-purple-600' },
  ];

  const statusOptions = [
    { value: 0, label: 'Unverified' },
    { value: 1, label: 'Allowed' },
    { value: 2, label: 'Declined' },
  ];

  const genderLabels = {
    1: 'Male',
    2: 'Female'
  };

  const openUserEditPanel = (userId) => {
    window.open(`/edit-user/${userId}`, '_blank');
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
            <Settings size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors duration-200">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
  
      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users, tickets..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex items-center">
              <Bell className="text-gray-500 mr-4" size={20} />
              <img src="/api/placeholder/32/32" alt="Admin" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </header>
  
        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
          
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className={`${card.color} rounded-full p-3 mr-4`}>
                  {React.cloneElement(card.icon, { className: 'text-white' })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                  <p className="text-gray-500">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Recent Activities table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentUsers.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">New user registered</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.firstname} {user.lastname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{genderLabels[user.gender]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={user.status}
                        onChange={(e) => updateStatus(user._id, e.target.value)}
                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => openUserEditPanel(user._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
