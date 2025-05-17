import React, { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentTable from '../components/AppointmentTable';
import { getAppointments, createAppointment } from '../utils/api';
import { useEffect } from 'react';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    getAppointments()
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Error loading appointments', err));
  }, []);

  const handleFormSubmit = (data) => {
    const newAppointment = {
      id: editingAppointment ? editingAppointment.id : Date.now(),
      day: new Date(data.date).getDate(),
      month: new Date(data.date).getMonth() + 1,
      title: data.title,
      reminder: data.reminder?.value || data.reminder,
      email: data.email,
      date: data.date,
    };

    if (editingAppointment) {
      // Update
      setAppointments(prev =>
        prev.map(appt => (appt.id === editingAppointment.id ? newAppointment : appt))
      );
      setEditingAppointment(null);
    } else {
      // Create
      setAppointments(prev => [...prev, newAppointment]);
    }
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
      reminder: { value: appointment.reminder, label: appointment.reminder },
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
              onSubmit={handleFormSubmit}
              defaultValues={editingAppointment || {
                date: '',
                title: '',
                email: '',
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
