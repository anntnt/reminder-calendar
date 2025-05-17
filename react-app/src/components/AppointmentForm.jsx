import React, { useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../utils/appointmentSchema';
import API from '../utils/api'; 
import { getFutureDate } from '../utils/date';


const reminderOptions = [
  { value: 1, label: '1 Tag' },
  { value: 2, label: '2 Tage' },
  { value: 4, label: '4 Tage' },
  { value: 7, label: '1 Woche' },
  { value: 14, label: '2 Wochen' },
];

const AppointmentForm = ({ onSubmit: externalOnSubmit, defaultValues }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(appointmentSchema),
  });

  const onFormSubmit = async (data) => {
    setMessage('');
    setError('');

    try {

      const dateObj = new Date(data.date);
      const formattedDate = new Date(dateObj.setDate(dateObj.getDate() + 1)).toISOString().split('T')[0];

      const payload = {
        title: data.title,
        date: formattedDate,// 'YYYY-MM-DD'
        notify_before_days: data.reminder.value,
      };

      console.log('Payload:', payload);

      const res = await API.post('/create-appointment.php', payload);

      setMessage('✅ Termin erfolgreich erstellt!');
      reset();

      if (externalOnSubmit) externalOnSubmit(res.data);
    } catch (err) {
      const msg = err.response?.data?.error || '❌ Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
      setError(msg);
      console.error('Error creating appointment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-3">
        {/* Datum */}
        <div className="col-12 col-xl-4">
          <label className="form-label">Datum</label>
          <input
            type="date"
            className="form-control"
            min={getFutureDate()} // 👇 this disables today and earlier
            {...register('date')}
          />

          {errors.date && <p className="text-danger">{errors.date.message}</p>}
        </div>

        {/* Bezeichnung */}
        <div className="col-12 col-xl-5">
          <label className="form-label">Bezeichnung</label>
          <input className="form-control" {...register('title')} />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        {/* Erinnerung and Button */}
        <div className="col-12 col-xl-3 d-flex flex-column justify-content-between">
          <div>
            <label className="form-label">Erinnerung</label>
            <Controller
              name="reminder"
              control={control}
              render={({ field }) => (
                <Select {...field} options={reminderOptions} />
              )}
            />
            {errors.reminder && <p className="text-danger">{errors.reminder.message}</p>}
          </div>

          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary text-uppercase">
              Speichern
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AppointmentForm;
