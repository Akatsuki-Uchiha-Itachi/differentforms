import React, { useState } from 'react';

const FormL1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      newErrors.guestName = 'Guest name is required if attending with a guest';
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
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Are you attending with a guest?
        </label>
        <select
          name="attendingWithGuest"
          value={formData.attendingWithGuest}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      {formData.attendingWithGuest === 'Yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Guest Name</label>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm p-2"
          />
          {errors.guestName && (
            <p className="text-red-500 text-sm">{errors.guestName}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FormL1;
