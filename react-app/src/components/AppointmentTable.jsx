// components/AppointmentTable.jsx
import React from 'react';

const AppointmentTable = ({ appointments, onDelete, onEdit }) => (
  <div className="border rounded p-4 mb-4 bg-light">
    <h4 className="mt-4">Ihre Termine</h4>
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
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td>{`${appointment.day}.${appointment.month}`}</td>
            <td>{appointment.title}</td>
            <td>{appointment.reminder}</td>
            <td>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(appointment.id)}>Löschen</button>
              <button className="btn btn-sm btn-secondary ms-2" onClick={() => onEdit(appointment)}>Bearbeiten</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AppointmentTable;
