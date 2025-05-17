// Appointments.jsx
import React, { useState, useEffect } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentTable from '../components/AppointmentTable';
import { getAppointments } from '../utils/api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const loadAppointments = async () => {
    try {
      const res = await getAppointments();
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

  const handleDelete = (id) => {
    setAppointments(prev => prev.filter(appt => appt.id !== id));
    if (editingAppointment?.id === id) {
      setEditingAppointment(null);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment({
      ...appointment,
      reminder: { value: appointment.reminder, label: `${appointment.reminder} Tage` },
    });
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
            />
          </div>

          <AppointmentTable
            appointments={appointments}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default Appointments;
