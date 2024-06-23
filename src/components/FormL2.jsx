import React, { useState } from 'react';

const FormL2 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});

  const skills = ['JavaScript', 'CSS', 'Python', 'React', 'Node.js'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          additionalSkills: [...formData.additionalSkills, value],
        });
      } else {
        setFormData({
          ...formData,
          additionalSkills: formData.additionalSkills.filter((skill) => skill !== value),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
      newErrors.relevantExperience = 'Relevant Experience is required';
    } else if (formData.relevantExperience && (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
    if (formData.position === 'Designer' && !formData.portfolioURL) {
      newErrors.portfolioURL = 'Portfolio URL is required';
    } else if (formData.portfolioURL && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(formData.portfolioURL)) {
      newErrors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (isNaN(Date.parse(formData.preferredInterviewTime))) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time must be a valid date and time';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Applying for Position</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        >
          <option value="">Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {(formData.position === 'Developer' || formData.position === 'Designer') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Relevant Experience (years)</label>
          <input
            type="number"
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          />
          {errors.relevantExperience && <p className="text-red-500 text-sm">{errors.relevantExperience}</p>}
        </div>
      )}
      {formData.position === 'Designer' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio URL</label>
          <input
            type="text"
            name="portfolioURL"
            value={formData.portfolioURL}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          />
          {errors.portfolioURL && <p className="text-red-500 text-sm">{errors.portfolioURL}</p>}
        </div>
      )}
      {formData.position === 'Manager' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Management Experience</label>
          <input
            type="text"
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          />
          {errors.managementExperience && <p className="text-red-500 text-sm">{errors.managementExperience}</p>}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Skills</label>
        <div className="mt-2 space-y-2">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center">
              <input
                type="checkbox"
                name="additionalSkills"
                value={skill}
                checked={formData.additionalSkills.includes(skill)}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border border-gray-400 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">{skill}</label>
            </div>
          ))}
        </div>
        {errors.additionalSkills && <p className="text-red-500 text-sm">{errors.additionalSkills}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Interview Time</label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={formData.preferredInterviewTime}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        />
        {errors.preferredInterviewTime && <p className="text-red-500 text-sm">{errors.preferredInterviewTime}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FormL2;
