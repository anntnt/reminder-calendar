import React, { useState, useEffect } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentTable from '../components/AppointmentTable';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        day: '16',
        month: '05',
        title: 'Arzttermin',
        reminder: '1 Tag',
        email: 'test@example.com',
      },
    ];
    setAppointments(mockData);
  }, []);

  const handleFormSubmit = (data) => {
    const newAppointment = {
      id: Date.now(),
      day: data.day.value,
      month: data.month.value,
      title: data.title,
      reminder: data.reminder.value,
      email: data.email,
    };
    setAppointments([...appointments, newAppointment]);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handleEdit = (appointment) => {
    // Prepare selected values for Select
    const edited = {
      day: { value: appointment.day, label: appointment.day },
      month: { value: appointment.month, label: appointment.month },
      title: appointment.title,
      reminder: { value: appointment.reminder, label: appointment.reminder },
      email: appointment.email,
    };
    handleFormSubmit(edited); // reuse form to repopulate
    setAppointments(appointments.filter((a) => a.id !== appointment.id));
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
            <AppointmentForm onSubmit={handleFormSubmit} />
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
