// CalendarHeader.jsx
import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarHeader = ({ currentDate, setCurrentDate, onAddEvent }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1));
  const handleMonthChange = (e) => setCurrentDate(new Date(year, parseInt(e.target.value)));
  const handleYearChange = (e) => setCurrentDate(new Date(parseInt(e.target.value), month));

  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 bg-gray-800 border border-gray-700 p-4 rounded-2xl shadow-sm text-white">
      {/* Title + Today’s Date */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-sm text-gray-300">{formattedToday}</p>
          </div>
        </div>

        {/* Month/Year Dropdown + Arrows */}
        <div className="flex gap-2 items-center text-sm">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <select
            value={month}
            onChange={handleMonthChange}
            className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm"
          >
            {MONTHS.map((m, i) => (
              <option value={i} key={m}>{m}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={handleYearChange}
            className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm"
          >
            {Array.from({ length: 20 }, (_, i) => year - 10 + i).map((y) => (
              <option value={y} key={y}>{y}</option>
            ))}
          </select>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-indigo-700 shadow"
        >
          Today
        </button>
        <button
          onClick={() => onAddEvent()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow hover:bg-gray-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
