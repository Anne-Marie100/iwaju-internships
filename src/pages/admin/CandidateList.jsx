import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

import { Edit3, UserCheck, UserX, MessageSquare } from 'lucide-react';

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Charger les candidats depuis Supabase
 const fetchCandidates = async () => {
  setLoading(true);
  try {
    // ÉTAPE 1 : On récupère uniquement les données de base (sans jointure)
    const { data, error } = await supabase
      .from('applications')
      .select('*');

    if (error) throw error;

    console.log("Données brutes reçues :", data);
   
    // ÉTAPE 2 : On force l'affichage même si profiles est vide
    setCandidates(data || []);
   
  } catch (err) {
    console.error("Erreur de récupération :", err.message);
    alert("Problème de connexion Supabase : " + err.message);
  } finally {
    setLoading(false); // Force la disparition du message "Chargement..."
  }
};
  if (loading) return <div className="p-10 text-center">Chargement des talents...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="p-4 font-semibold text-gray-600">Candidat</th>
            <th className="p-4 font-semibold text-gray-600">Statut Actuel</th>
            <th className="p-4 font-semibold text-gray-600">Commentaires Recruteur</th>
            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {candidates.map((c) => (
  <tr key={c.id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
    {/* 1. Colonne Candidat */}
    <td className="p-4 text-sm">
      <div className="font-bold text-gray-900">{c.profiles?.nom || "Candidat Anonyme"}</div>
      <div className="text-gray-500 text-xs">{c.profiles?.ecole}</div>
    </td>

    {/* 2. Colonne Statut */}
    <td className="p-4">
      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        {c.statut}
      </span>
    </td>

    {/* 3. Colonne Commentaires (C'est ici que le textarea doit être dans un <td>) */}
    <td className="p-4">
      <textarea
        className="w-full p-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-400 outline-none resize-none"
        placeholder="Ajouter un avis..."
        rows="2"
        defaultValue={c.notes}
        onBlur={(e) => saveAdminNote(c.id, e.target.value)}
      />
    </td>

    {/* 4. Colonne Actions */}
    <td className="p-4 text-right">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => updateStatus(c.id, 'Challenge')}
          className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          title="Passer en Challenge"
        >
          {/* Icône ou texte court */}
          Test
        </button>
        <button
          onClick={() => updateStatus(c.id, 'Admission')}
          className="p-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
          title="Admettre"
        >
          Admis
        </button>
      </div>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

// Petite fonction utilitaire pour les couleurs des badges
function getStatusStyle(status) {
  switch (status) {
    case 'Admission': return 'bg-green-100 text-green-700';
    case 'Challenge': return 'bg-blue-100 text-blue-700';
    case 'Refusé': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}