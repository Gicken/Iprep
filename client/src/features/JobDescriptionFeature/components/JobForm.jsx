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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
      <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="companyIndustry" placeholder="Industry" value={formData.companyIndustry} onChange={handleChange} required />
      <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
      <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} required />
      <input type="text" name="experience_level" placeholder="Experience Level" value={formData.experience_level} onChange={handleChange} required />
      <SecondaryButton type="submit">Submit</SecondaryButton>
    </form>
  );
};

export default JobForm;
