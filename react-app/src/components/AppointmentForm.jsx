// components/AppointmentForm.jsx
import React from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../utils/appointmentSchema';

const reminderOptions = [
  '1 Tag',
  '2 Tage',
  '4 Tage',
  '1 Woche',
  '2 Wochen',
].map((v) => ({ value: v, label: v }));

const AppointmentForm = ({ onSubmit, defaultValues }) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        {/* Datum */}
        <div className="col-12 col-xl-4">
          <label className="form-label">Datum</label>
          <input
            type="date"
            className="form-control"
            {...register('date')}
          />
          {errors.date && <p className="text-danger">{errors.date.message}</p>}
        </div>

        {/* Bezeichnung and Email */}
        <div className="col-12 col-xl-5">
          <label className="form-label">Bezeichnung</label>
          <input className="form-control mb-3" {...register('title')} />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}

          <label className="form-label">E-Mail-Adresse</label>
          <input className="form-control" {...register('email')} />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        {/* Erinnerung and Button stacked in same column */}
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

          <div className="d-grid mt-3 mt-xl-auto">
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
