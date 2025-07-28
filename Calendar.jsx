// Calendar.jsx
import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import EventDetailsModal from './EventDetailsModal';
import { events as initialEvents } from '../data/events';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [events, setEvents] = useState(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddEvent = (date = new Date()) => {
    setSelectedDate(date);
    setShowAddModal(true);
  };

  const handleSaveEvent = (newEvent) => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(prev => prev.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowEditModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <CalendarHeader 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
          onAddEvent={handleAddEvent} 
        />
        <CalendarGrid 
          currentDate={currentDate} 
          events={events} 
          onDayClick={handleAddEvent} 
          onEventClick={setSelectedEvent} 
        />

        {showAddModal && (
          <AddEventModal 
            date={selectedDate} 
            onClose={() => setShowAddModal(false)} 
            onSave={handleSaveEvent} 
          />
        )}

        {showEditModal && selectedEvent && (
          <EditEventModal 
            event={selectedEvent} 
            onClose={() => setShowEditModal(false)} 
            onUpdate={handleUpdateEvent} 
          />
        )}

        {selectedEvent && !showEditModal && (
          <EventDetailsModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            onEdit={handleEditEvent} 
            onDelete={handleDeleteEvent} 
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
