// AddEventModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'purple', label: 'bg-purple-500' },
  { value: 'orange', label: 'bg-orange-500' },
  { value: 'red', label: 'bg-red-500' },
];

const AddEventModal = ({ date, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    date: date.toISOString().split('T')[0],
    time: '09:00',
    duration: 60,
    color: 'blue',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-gray-900 text-white rounded-2xl w-full max-w-md p-6 shadow-xl relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Event</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 placeholder-gray-400"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="time"
              value={form.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Color</label>
            <div className="flex space-x-3">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleChange('color', opt.value)}
                  className={`w-8 h-8 rounded-full ${opt.class} ${
                    form.color === opt.value ? 'ring-4 ring-white/30' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Save
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
