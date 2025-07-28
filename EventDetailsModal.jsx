// EventDetailsModal.jsx
import React from 'react';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { formatTime } from '../utils/dateUtils';

const COLOR_DOT = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

const EventDetailsModal = ({ event, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-gray-900 text-white rounded-2xl w-full max-w-md p-6 shadow-xl relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${COLOR_DOT[event.color]}`}></span>
          {event.title}
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-gray-300">
            <CalendarIcon className="w-5 h-5" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="w-5 h-5" />
            {formatTime(event.time)} • {event.duration} min
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className={`w-4 h-4 rounded-full ${COLOR_DOT[event.color]}`}></div>
            <span className="capitalize">{event.color} Category</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => onEdit(event)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="bg-red-100/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-100/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
