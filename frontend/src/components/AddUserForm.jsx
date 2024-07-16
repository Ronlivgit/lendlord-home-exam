import React, { useState } from 'react';
import { fetchByUserId } from '../utils/utils';

const AddUserForm = ({ managers, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateStarted: '',
    salary: '',
    userRole: '',
    responsibleManager: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const managerObject = await fetchByUserId(formData.responsibleManager)
    const dateFromString = new Date(formData.dateStarted).toISOString()
    const finalFormData = {
      ...formData,
      dateStarted : dateFromString,
      responsibleManager : managerObject
    }
    onSave(finalFormData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg lg:w-[30%] w-[70%]">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateStarted" className="block mb-1">Date Started</label>
            <input
              type="date"
              id="dateStarted"
              name="dateStarted"
              value={formData.dateStarted}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block mb-1">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userRole" className="block mb-1">User Role</label>
            <select
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={"manager"}>Manager</option>
              <option value={"worker"}>Worker</option>
              <option value={"driver"}>Driver</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="responsibleManager" className="block mb-1">Responsible Manager</label>
            <select
              id="responsibleManager"
              name="responsibleManager"
              value={formData.responsibleManager}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a manager</option>
              {managers.map((manager, index) => (
                <option key={index} value={manager._id}>
                  {manager.firstName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;