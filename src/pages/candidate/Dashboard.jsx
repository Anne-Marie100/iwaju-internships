import React, { useState, useEffect } from 'react';
import Stepper from '../../components/ui/Stepper';
import { supabase } from '../../utils/supabaseClient';

export default function Dashboard() {
  // On simule un statut venant de la base de données.
  // Plus tard, ce sera : const [status, setStatus] = useState(data.status)
  const [status, setStatus] = useState("Entretien");
useEffect(() => {
  const fetchStatus = async () => {
    const { data } = await supabase
      .from('applications')
      .select('statut')
      .single();
    if (data) setStatus(data.statut);
  };

  fetchStatus();

  // ÉCOUTE EN TEMPS RÉEL (L'effet "Wow" pour le jury)
  const channel = supabase
    .channel('schema-db-changes')
    .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'applications' },
        (payload) => {
          setStatus(payload.new.statut);
        })
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête de bienvenue */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">Bienvenue dans votre espace</h1>
        <p className="text-gray-500 mt-1">Suivez l'évolution de votre candidature en temps réel.</p>
      </div>

      {/* Section du Stepper */}
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 pb-16">
        <h3 className="text-lg font-semibold text-gray-800 mb-10">État d'avancement</h3>
        <Stepper currentStatus={status} />
      </div>

      {/* Message contextuel selon le statut */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <div className="flex-shrink-0">ℹ️</div>
          <div>
            <h4 className="font-bold text-blue-900">Prochaine étape : {status}</h4>
            <p className="text-blue-700 text-sm mt-1">
              {status === "Challenge"
                ? "Vous allez bientôt recevoir un email contenant les instructions pour votre test technique."
                : "Votre dossier est en cours d'analyse par nos équipes."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}