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
  