import React, { useState } from 'react';
import Stepper from '../components/ui/Stepper';
import ApplicationForm from '../components/forms/ApplicationForm';

const CandidateHome = () => {
  // État local pour tester le dynamisme avant de brancher Supabase
  const [currentStatus, setCurrentStatus] = useState("Inscription");

  const handleFormSubmit = (data) => {
    console.log("Données reçues :", data);
    // Ici, vous ajouterez plus tard l'appel à Supabase
    // Une fois soumis, on peut imaginer passer au statut suivant :
    setCurrentStatus("Challenge");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">IWAJU Internships - Mon Suivi</h1>
     
      {/* Affichage du Stepper */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <Stepper currentStatus={currentStatus} />
      </div>

      {/* Affichage du Formulaire uniquement si on est à l'étape Inscription */}
      {currentStatus === "Inscription" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4">Soumettre ma candidature</h2>
          <ApplicationForm onSubmit={handleFormSubmit} />
        </div>
      )}

      {currentStatus !== "Inscription" && (
        <div className="text-center p-10 bg-green-50 rounded-lg">
          <p className="text-green-700 font-medium">Votre candidature a été reçue ! Prochaine étape : le Challenge.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateHome;

