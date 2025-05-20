import React from 'react';
import { formatAppointmentDate, formatReminder, sortAppointmentsByDate } from '../utils/date';

const AppointmentTable = ({ appointments, onDelete, onEdit, successMessage }) => {
  const sortedAppointments = sortAppointmentsByDate(appointments); // asc by default

  return (
    <div className="border rounded p-4 mb-4 bg-light">
      <h4 className="mt-4">Deine Termine</h4>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Datum</th>
            <th>Bezeichnung</th>
            <th>Erinnerung</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {sortedAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{formatAppointmentDate(appointment.date)}</td>
              <td>{appointment.title}</td>
              <td>{formatReminder(appointment.notify_before_days)}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(appointment)}>Bearbeiten</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(appointment.id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
