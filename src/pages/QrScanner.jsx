import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const QRScanner = ({ onComplete }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
    const [currentField, setCurrentField] = useState(0);

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'tel' },
        { name: 'city', label: 'City', type: 'text' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-600 mb-6 animate-slideDown">
                Solar Expo Registration
            </h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onComplete(formData);
            }} className="space-y-6">
                <div className="bg-yellow-100 p-8 rounded-lg flex justify-center animate-pulse">
                    <Camera className="w-16 h-16 text-green-600 animate-bounce" />
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.name}
                            className={`transform transition-all duration-500 ${index === currentField ? 'scale-105' : 'scale-100'}`}
                        >
                            <input
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                                placeholder={field.label}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={(e) => {
                                    setFormData({ ...formData, [field.name]: e.target.value });
                                    if (e.target.value && index < fields.length - 1) {
                                        setCurrentField(index + 1);
                                    }
                                }}
                                onFocus={() => setCurrentField(index)}
                                required
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all hover:scale-105"
                >
                    Start Game
                </button>
            </form>
        </div>
    );
};

export default QRScanner;