import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, BarChart3, MousePointer2 } from 'lucide-react';

const AdminLayout = () => {
  // Style pour le lien actif dans la sidebar
  const activeStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Latérale */}
      <aside className="w-64 bg-white border-r flex flex-col shadow-sm">
        <div className="p-6 border-b">
          <span className="font-bold text-xl text-blue-600 italic">IWAJU ADMIN</span>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-2">Pilotage</p>
          <NavLink to="/admin/dashboard" className={activeStyle}>
            <LayoutDashboard size={20} />
            <span>Vue d'ensemble</span>
          </NavLink>
          <NavLink to="/admin/analytics" className={activeStyle}>
            <BarChart3 size={20} />
            <span>Google Analytics</span>
          </NavLink>
          <NavLink to="/admin/clarity" className={activeStyle}>
            <MousePointer2 size={20} />
            <span>Microsoft Clarity</span>
          </NavLink>

          <div className="pt-4 mt-4 border-t"></div>
          <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-2">Gestion</p>
          <NavLink to="/admin/candidats" className={activeStyle}>
            <Users size={20} />
            <span>Candidatures</span>
          </NavLink>
          <NavLink to="/admin/parametres" className={activeStyle}>
            <Settings size={20} />
            <span>Paramètres</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Zone de contenu principale */}
      <div className="flex-grow flex flex-col">
        {/* Header Admin */}
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Tableau de Bord Administrateur</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Responsable RH</p>
              <p className="text-xs text-gray-500">Session active</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              RH
            </div>
          </div>
        </header>

        {/* Contenu dynamique */}
        <main className="p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;