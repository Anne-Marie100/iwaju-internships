import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabaseClient';

export default function Registration() {
  const handleSignUp = async (e) => {
    e.preventDefault(); // Empêche la page de se recharger
   
    // On récupère les données des champs du formulaire
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const fullName = formData.get('fullName');
    const school = formData.get('school');
    const specialite = formData.get('specialite');

    // A. Création du compte dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert("Erreur : " + authError.message);
      return;
    }

    const user = authData.user;

    if (user) {
      // B. On remplit votre table 'profiles' (grâce à l'ID généré par Auth)
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, nom: fullName, ecole: school, specialite: specialite }]);

      // C. On crée la candidature dans la table 'applications'
      const { error: appError } = await supabase
        .from('applications')
        .insert([{ user_id: user.id, statut: 'Inscription' }]);

      if (!profileError && !appError) {
        alert("Candidature envoyée avec succès !");
        // Optionnel : rediriger vers le dashboard
        // window.location.href = "/candidat/dashboard";
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Postuler à IWAJU</h1>
        <p className="text-gray-500 mt-2">Remplissez les informations ci-dessous pour débuter votre parcours.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom Complet */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nom Complet</label>
          <input
            name="fullName"
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: JEAN Dupont"
          />
        </div>

        {/* Université */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Université / École</label>
          <input
            name="school"
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: ENEAM, IFRI..."
          />
        </div>

        {/* Spécialité */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Spécialité</label>
          <select
            name="specialite"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="Développement Logiciel">Développement Logiciel</option>
            <option value="Réseaux et Sécurité">Réseaux et Sécurité</option>
            <option value="Intelligence Artificielle">Intelligence Artificielle</option>
          </select>
        </div>

        {/* Date de début (Optionnel selon tes besoins) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Période souhaitée</label>
          <input
            name="startDate"
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* --- SECTION AUTHENTIFICATION (OBLIGATOIRE) --- */}
      <div className="border-t border-gray-200 pt-6 mt-6 space-y-6">
        <h3 className="text-md font-bold text-gray-800">Identifiants de connexion</h3>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="candidat@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
            <input
              name="password"
              type="password"
              required
              minLength="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="6 caractères minimum"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        En cliquant sur envoyer, vous créez votre compte IWAJU pour suivre votre dossier.
      </p>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-transform active:scale-95"
        >
          Envoyer ma candidature
        </button>
      </form>
    </div>
  );
}