export function formatReminder(days) {
    switch (days) {
      case 1: return '1 Tag';
      case 2: return '2 Tage';
      case 4: return '4 Tage';
      case 7: return '1 Woche';
      case 14: return '2 Wochen';
      default: return `${days} Tage`;
    }
  }
  export const reminderOptions = [
    { value: 1, label: '1 Tag' },
    { value: 2, label: '2 Tage' },
    { value: 4, label: '4 Tage' },
    { value: 7, label: '1 Woche' },
    { value: 14, label: '2 Wochen' },
  ];

  export function formatAppointmentDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
  
    const isFutureYear = date.getFullYear() > now.getFullYear();
  
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: isFutureYear ? '2-digit' : undefined,
    });
  }

  export function getFutureDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }
  
  export function sortAppointmentsByDate(appointments, order = 'asc') {
    return [...appointments].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
