// DayCell.jsx
import React from 'react';
import { formatTime, getEventsForDate, hasTimeConflicts, isToday } from '../utils/dateUtils';
import { Plus, AlertTriangle, Clock } from 'lucide-react';

const EVENT_COLORS = {
  blue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
  green: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
  purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  orange: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
  red: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
};

const DayCell = ({ date, isCurrentMonth, events, onAdd, onClickEvent }) => {
  const dayEvents = getEventsForDate(events, date);
  const conflicts = hasTimeConflicts(dayEvents);
  const today = isToday(date);

  return (
    <div
      className={`group relative w-[150px] h-[130px] p-3 m-1 flex flex-col justify-between rounded-2xl transition-all duration-300
        ${
          isCurrentMonth
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-400 dark:text-gray-500'
        }
        ${today ? 'ring-2 ring-sky-500' : ''}
        bg-white/30 dark:bg-gray-800/30 border border-gray-300/50 dark:border-gray-600/50 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02]
      `}
    >
      {/* Date Header */}
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold text-sm">{date.getDate()}</span>
        {conflicts && <AlertTriangle className="w-4 h-4 text-yellow-500" title="Time conflict" />}
      </div>

      {/* Events */}
      <div className="space-y-1 flex-1 overflow-hidden">
        {dayEvents.slice(0, 2).map((event) => (
          <div
            key={event.id}
            onClick={() => onClickEvent(event)}
            className={`text-xs px-2 py-1 rounded-lg cursor-pointer truncate shadow-sm hover:scale-105 transition-all duration-150 ${EVENT_COLORS[event.color]}`}
          >
            <div className="font-medium truncate">{event.title}</div>
            <div className="flex items-center text-[10px] mt-0.5 opacity-90">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(event.time)}
            </div>
          </div>
        ))}

        {dayEvents.length > 2 && (
          <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
            +{dayEvents.length - 2} more
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => onAdd(date)}
        className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-110"
        title="Add Event"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

export default DayCell;
