import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';

const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barre de navigation simple */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <span className="font-bold text-xl text-gray-800 tracking-tight">IWAJU Internships</span>
        </div>
       
        <div className="flex items-center gap-6">
          <Link to="/candidat/suivi" className="text-gray-600 hover:text-blue-600 font-medium">Mon Dossier</Link>
          <div className="h-6 w-px bg-gray-200"></div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>

      {/* Contenu de la page (Registration ou Dashboard) */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer minimaliste */}
      <footer className="py-6 text-center text-gray-400 text-sm border-t bg-white">
        © {new Date().getFullYear()} IWAJU Internships - Portail de Candidature
      </footer>
    </div>
  );
};

export default CandidateLayout;