import React, { useState, useEffect } from 'react';

const FormL3 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
    additionalQuestions: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.surveyTopic) {
      // Fetch additional questions based on the survey topic
      fetch(`https://survey-3.onrender.com/api/v2/${formData.surveyTopic.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          setFormData(prevState => ({
            ...prevState,
            additionalQuestions: data,
          }));
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching additional questions:', error);
        });
    }
  }, [formData.surveyTopic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.surveyTopic) {
      newErrors.surveyTopic = 'Survey Topic is required';
    }
    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) {
        newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      }
      if (!formData.yearsOfExperience) {
        newErrors.yearsOfExperience = 'Years of Experience is required';
      } else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience <= 0) {
        newErrors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
      }
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) {
        newErrors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!formData.dietPreference) {
        newErrors.dietPreference = 'Diet Preference is required';
      }
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) {
        newErrors.highestQualification = 'Highest Qualification is required';
      }
      if (!formData.fieldOfStudy) {
        newErrors.fieldOfStudy = 'Field of Study is required';
      }
    }
    if (!formData.feedback) {
      newErrors.feedback = 'Feedback is required';
    } else if (formData.feedback.length < 50) {
      newErrors.feedback = 'Feedback must be at least 50 characters';
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
        <label className="block text-sm font-medium text-gray-700">Survey Topic</label>
        <select
          name="surveyTopic"
          value={formData.surveyTopic}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        >
          <option value="">Select a topic</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <p className="text-red-500 text-sm">{errors.surveyTopic}</p>}
      </div>
      {formData.surveyTopic === 'Technology' && (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Favorite Programming Language</label>
            <select
              name="favoriteProgrammingLanguage"
              value={formData.favoriteProgrammingLanguage}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            >
              <option value="">Select a language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            />
            {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
          </div>
        </div>
      )}
      {formData.surveyTopic === 'Health' && (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Exercise Frequency</label>
            <select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            >
              <option value="">Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Diet Preference</label>
            <select
              name="dietPreference"
              value={formData.dietPreference}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            >
              <option value="">Select diet preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
          </div>
        </div>
      )}
      {formData.surveyTopic === 'Education' && (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
            <select
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            >
              <option value="">Select qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <p className="text-red-500 text-sm">{errors.highestQualification}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
            />
            {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
          </div>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Feedback</label>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          rows="4"
        ></textarea>
        {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
      </div>
      {formData.additionalQuestions.map((question, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700">{question.question}</label>
          <select
            name={`additionalQuestion${index}`}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          >
            <option value="">Select an option</option>
            {question.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FormL3;
