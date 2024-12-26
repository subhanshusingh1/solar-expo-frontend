import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const SolarApp = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  const [currentField, setCurrentField] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.register, {
        name: formData.name,
        phone: formData.phone,
        city: formData.city
      });

      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem('playerName', formData.name);
        localStorage.setItem('phone', formData.phone);
        
        // Navigate to game selection
        navigate('/game-selection');
      } else {
        setErrors(prev => ({ ...prev, submit: 'Registration failed' }));
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.error) {
        setErrors(prev => ({ ...prev, submit: error.response.data.error }));
      } else {
        setErrors(prev => ({ ...prev, submit: 'An error occurred' }));
      }
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'city', label: 'City', type: 'text' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Solar Expo Registration
          </h2>
          <div className="flex justify-center items-center mb-6">
            <img 
              src="/assest/logo.jpeg" 
              alt="Company Logo" 
              className="w-48 h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.name}
                className={`transform transition-all duration-500 ${index === currentField ? 'scale-105' : 'scale-100'}`}
              >
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={field.label}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={(e) => {
                    setFormData({ ...formData, [field.name]: e.target.value });
                    if (errors[field.name]) {
                      setErrors({ ...errors, [field.name]: '' });
                    }
                    if (e.target.value && index < fields.length - 1) {
                      setCurrentField(index + 1);
                    }
                  }}
                  onFocus={() => setCurrentField(index)}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
            {errors.submit && (
              <p className="text-red-500 text-sm mt-1">{errors.submit}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all hover:scale-105"
          >
            Register
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">Powered by</span>
            </div>
          </div>
          
          <h3 className="mt-4 text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent animate-pulse">
            Yo Green Solar
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Created with &hearts; by Bhavik and Subhanshu
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolarApp;
