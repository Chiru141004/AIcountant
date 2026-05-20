import { useState } from 'react';

import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { sidebarMenuItems } from '../data/dashboardData';

const complianceSubmenu = [
  { key: 'gst', label: 'GST Returns', href: '/gst' },
  { key: 'tds', label: 'TDS', href: '/tds' },
  { key: 'audit', label: 'Audit', href: '/audit' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (id) => {
    setExpandedSubmenu(expandedSubmenu === id ? null : id);
  };

  const mainMenuItems = sidebarMenuItems.filter((item) => !item.submenu);

  const isActive = (href) => href !== '/' && location.pathname.startsWith(href);

  return (

    <>
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-600 text-white rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : '-translate-x-full md:translate-x-0 md:w-64'
        }`}
      >
        <div className="p-6 border-b border-primary-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center font-bold text-lg">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AICountant</h1>
              <p className="text-xs text-primary-300">Smart. Automated. Compliant.</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-4 space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = LucideIcons[item.icon] || LucideIcons.Home;
              const hasSubmenu = item.hasSubmenu;
              const active = item.href === '/' ? location.pathname === '/' : isActive(item.href);

              return (
                <div key={item.id}>
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                        active
                          ? 'bg-white bg-opacity-20 text-white'
                          : 'text-primary-100 hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedSubmenu === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                        active
                          ? 'bg-white bg-opacity-20 text-white'
                          : 'text-primary-100 hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  )}

                  {hasSubmenu && expandedSubmenu === item.id && (
                    <div className="mt-1 ml-4 space-y-1 border-l border-primary-600 pl-3">
                      {complianceSubmenu.map((sub) => (
                        <Link
                          key={sub.key}
                          to={sub.href}
                          className={`w-full text-left px-4 py-2 text-xs rounded transition-colors text-primary-200 hover:text-white ${
                            isActive(sub.href) ? 'text-white bg-white/10' : ''
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-primary-700 bg-gradient-to-b from-primary-800 to-primary-900">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <Sparkles size={16} className="text-yellow-300 flex-shrink-0 mt-1" />
              <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
            </div>
            <p className="text-xs text-primary-100 mb-3">
              Ask AI Assistant to analyze, automate, and accelerate workflows.
            </p>
            <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold text-xs hover:bg-opacity-90 transition-all duration-200">
              Ask AI
            </button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

