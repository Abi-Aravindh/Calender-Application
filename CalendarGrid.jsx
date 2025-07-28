// CalendarGrid.jsx
import React, { useMemo } from 'react';
import DayCell from './DayCell';

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({ currentDate, events, onDayClick, onEventClick }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => {
    const result = [];

    const firstDayOfMonth = new Date(year, month, 1);
    const firstWeekDay = firstDayOfMonth.getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // Days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstWeekDay - 1; i >= 0; i--) {
      result.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let day = 1; day <= lastDayOfMonth; day++) {
      result.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // Next month days to fill 6x7 grid
    const totalCells = 35;
    const nextMonthDays = totalCells - result.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      result.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return result;
  }, [year, month]);

  return (
    <div className="bg-gray-800 rounded-2xl shadow border border-gray-700 overflow-hidden text-white">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 bg-gray-900 text-center text-sm font-semibold uppercase tracking-wide border-b border-gray-700">
  {DAYS_SHORT.map((day) => (
    <div key={day} className="py-4 text-white">{day}</div>
  ))}
</div>

      {/* Grid of Days */}
      <div className="grid grid-cols-7 p-2">
        {days.map(({ date, isCurrentMonth }, idx) => (
          <DayCell
            key={idx}
            date={date}
            isCurrentMonth={isCurrentMonth}
            events={events}
            onAdd={onDayClick}
            onClickEvent={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
