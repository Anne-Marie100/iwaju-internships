
import { useForm } from "react-hook-form";

const ApplicationForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium">Nom complet</label>
        <input {...register("fullName", { required: true })} className="w-full border p-2 rounded" />
      </div>
     
      <div>
        <label className="block text-sm font-medium">École</label>
        <input {...register("school", { required: true })} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Spécialité</label>
        <select {...register("specialty")} className="w-full border p-2 rounded">
          <option value="dev">Développement Web</option>
          <option value="data">Data Science</option>
          <option value="design">UI/UX Design</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Période de stage</label>
        <input type="date" {...register("startDate")} className="w-full border p-2 rounded" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Soumettre ma candidature
      </button>
    </form>
  );
};