import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import des Layouts
import CandidateLayout from './layouts/CandidateLayout';
import AdminLayout from './layouts/AdminLayout';

// Import des Pages (à créer dans vos dossiers pages/)
import Registration from './pages/candidate/Registration';
import CandidateDashboard from './pages/candidate/Dashboard';
import AdminMain from './pages/admin/MainDashboard';
import CandidateList from './pages/admin/CandidateList';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- ROUTES CANDIDAT --- */}
        {/* Toutes ces routes utiliseront le CandidateLayout (Header simple) */}
        <Route path="/candidat" element={<CandidateLayout />}>
          <Route path="inscription" element={<Registration />} />
          <Route path="suivi" element={<CandidateDashboard />} />
          {/* Redirection automatique si on tape juste /candidat */}
          <Route index element={<Navigate to="inscription" />} />
        </Route>

        {/* --- ROUTES ADMIN --- */}
        {/* Toutes ces routes utiliseront l'AdminLayout (Sidebar + Dashboard) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminMain />} />
          <Route path="candidats" element={<CandidateList />} />
          {/* Redirection automatique si on tape juste /admin */}
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        {/* --- ROUTE PAR DÉFAUT --- */}
        {/* Si l'utilisateur arrive sur la racine "/", on l'envoie vers l'inscription */}
        <Route path="/" element={<Navigate to="/candidat/inscription" />} />
       
        {/* Optionnel : Page 404 si l'URL n'existe pas */}
        <Route path="*" element={<div className="p-10 text-center">Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}

export default App;