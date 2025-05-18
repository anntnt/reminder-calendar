import React, { useState, useEffect } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentTable from '../components/AppointmentTable';
import API  from '../utils/api';
import { reminderOptions } from '../utils/date';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const loadAppointments = async () => {
    try {
      const res = await API.get('get-appointment.php');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error loading appointments', err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleFormSubmit = () => {
    loadAppointments(); // Refresh after creation
    setEditingAppointment(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Möchten Sie diesen Termin wirklich löschen?');
    if (!confirmDelete) return;

    setAppointments(prev => prev.filter(appt => appt.id !== id));
    if (editingAppointment?.id === id) {
      setEditingAppointment(null);
    }
    try {
      await API.delete('/delete-appointment.php', {
        data: { id }
      });      
      setSuccessMessage('Termin erfolgreich gelöscht.');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear after 3 seconds
    } catch (err) {
      console.error('Error deleting appointment', err);
    }
  };

  const handleEdit = (appointment) => {
    const matchedReminder = reminderOptions.find(
      opt => opt.value === Number(appointment.notify_before_days || appointment.reminder)
    );
  
    setEditingAppointment({
      ...appointment,
      reminder: matchedReminder || null,
    });
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };
  
  return (
    <div className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-12">
          <h1 className="display-5 fw-bold mb-3">Ihr persönlicher Terminplaner</h1>
          <p className="text-muted">
            Verwalten Sie Ihre persönlichen Termine bequem online und erhalten Sie automatische Erinnerungen per E-Mail.
          </p>

          <div className="border rounded p-4 mb-4 bg-light">
            <AppointmentForm
              onSubmit={handleFormSubmit} // only notify, no local data logic
              defaultValues={editingAppointment || {
                date: '',
                title: '',
                reminder: null,
              }}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <AppointmentTable
            appointments={appointments}
            onDelete={handleDelete}
            onEdit={handleEdit}     
            successMessage={successMessage}      
          />
        </div>
      </div>
    </div>
  );
}

export default Appointments;
