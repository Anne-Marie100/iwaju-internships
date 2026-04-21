import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const steps = [
  { id: 'Inscription', label: 'Candidature' },
  { id: 'Challenge', label: 'Test Technique' },
  { id: 'Entretien', label: 'Entretien RH' },
  { id: 'Admission', label: 'Décision Finale' }
];

export default function Stepper({ currentStatus }) {
  // Trouver l'index de l'étape actuelle
  const currentIndex = steps.findIndex(s => s.id === currentStatus);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Ligne de progression en arrière-plan */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
       
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              {/* Icône de l'étape */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isCompleted ? 'bg-green-500 border-green-500 text-white' :
                isCurrent ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110' :
                'bg-white border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? <CheckCircle2 size={20} /> :
                 isCurrent ? <Clock size={20} className="animate-pulse" /> :
                 <Circle size={20} />}
              </div>

              {/* Texte de l'étape */}
              <span className={`absolute -bottom-8 whitespace-nowrap text-xs font-bold transition-colors ${
                isCurrent ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}