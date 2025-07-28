export const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };
  
  export const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  export const getEventsForDate = (events, date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };
  
  export const hasTimeConflicts = (dayEvents) => {
    if (dayEvents.length <= 1) return false;
    
    const sortedEvents = [...dayEvents].sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });
  
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEvent = sortedEvents[i];
      const nextEvent = sortedEvents[i + 1];
  
      const currentTime = parseInt(currentEvent.time.replace(':', ''));
      const currentEndTime = currentTime + Math.floor(currentEvent.duration / 60) * 100 + (currentEvent.duration % 60);
      const nextTime = parseInt(nextEvent.time.replace(':', ''));
      
      if (currentEndTime > nextTime) {
        return true;
      }
    }
  
    return false;
  };
  