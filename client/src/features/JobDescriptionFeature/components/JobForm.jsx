import { useState } from "react";
import { SecondaryButton } from "../../../shared/components/Buttons";

const JobForm = ({ onSubmit, initialData = {}, closeModal }) => {
  const [formData, setFormData] = useState({
    companyName: initialData.companyName || "",
    title: initialData.title || "",
    companyIndustry: initialData.companyIndustry || "",
    companyInfo: initialData.companyInfo || "",
    description: initialData.description || "",
    skills: initialData.skills?.join(", ") || "",
    experience_level: initialData.experience_level || "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, skills: formData.skills.split(",").map((s) => s.trim()) });
    closeModal();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 bg-primary p-6 rounded-lg shadow-lg max-w-lg mx-auto text-white"
    >
      <input 
        type="text" 
        name="companyName" 
        placeholder="Company Name" 
        value={formData.companyName} 
        onChange={handleChange} 
        required 
        className="w-full p-3 border border-gray-300 rounded-lg bg-secondary text-white focus:ring-2 focus:ring-accent"
      />
      <input 
        type="text" 
        name="title" 
        placeholder="Job Title" 
        value={formData.title} 
        onChange={handleChange} 
        required 
        className="w-full p-3 border border-gray-300 rounded-lg bg-secondary text-white focus:ring-2 focus:ring-accent"
      />
      <input 
        type="text" 
        name="companyIndustry" 
        placeholder="Industry" 
        value={formData.companyIndustry} 
        onChange={handleChange} 
        required 
        className="w-full p-3 border border-gray-300 rounded-lg bg-secondary text-white focus:ring-2 focus:ring-accent"
      />
      <textarea 
        name="description" 
        placeholder="Job Description" 
        value={formData.description} 
        onChange={handleChange} 
        required 
        className="w-full p-3 border border-gray-300 rounded-lg bg-secondary text-white focus:ring-2 focus:ring-accent h-30 resize-none"
      />
      <input 
        type="text" 
        name="skills" 
        placeholder="Skills (comma-separated)" 
        value={formData.skills} 
        onChange={handleChange} 
        required 
        className="w-full p-3 border border-gray-300 rounded-lg bg-secondary text-white focus:ring-2 focus:ring-accent"
      />
      <input 
        type="text" 
        name="experience_level" 
        placeholder="Experience Level" 
        value={formData.experience_level} 
        onChange={handleChange} 
        required 
        className="w-full p-3 border border-gray-300 rounded-lg bg-secondary text-white focus:ring-2 focus:ring-accent"
      />
      <div className="flex justify-end">
        <SecondaryButton type="submit" className="px-5 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition">
          Submit
        </SecondaryButton>
      </div>
    </form>
  );
};

export default JobForm;
