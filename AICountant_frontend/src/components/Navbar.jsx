import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Plus, LogOut, User, Settings } from 'lucide-react';
import { clearSession } from '../api';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (userData) {
      return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`.toUpperCase();
    }
    return 'CA';
  };

  // Get display name
  const getDisplayName = () => {
    if (userData) {
      return `${userData.firstName} ${userData.lastName}`;
    }
    return 'CA Arjun';
  };

  // Get role
  const getRole = () => {
    if (userData) {
      return userData.role || 'Partner';
    }
    return 'Partner';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 md:left-64 bg-white border-b border-slate-200 z-30 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search clients, invoices, documents..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* New Button */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg">
            <Plus size={18} />
            New
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="text-sm font-medium text-slate-900">Notification title</p>
                      <p className="text-xs text-slate-600 mt-1">Notification description here</p>
                      <p className="text-xs text-slate-500 mt-2">2h ago</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-200 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                    View All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-4 py-2 border-l border-slate-200 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {getInitials()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{getDisplayName()}</p>
                <p className="text-xs text-slate-600">{getRole()}</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{getDisplayName()}</p>
                      <p className="text-xs text-slate-600">{getRole()}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <User size={16} />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    <Settings size={16} />
                    Settings
                  </button>
                  <div className="border-t border-slate-200 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
