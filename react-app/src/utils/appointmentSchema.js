import * as yup from 'yup';

const reminderDaysMap = {
  '1 Tag': 1,
  '2 Tage': 2,
  '4 Tage': 4,
  '1 Woche': 7,
  '2 Wochen': 14,
};

export const appointmentSchema = yup
  .object()
  .shape({
    date: yup
      .date()
      .required('Datum ist erforderlich')
      .min(new Date(Date.now() + 86400000), 'Datum muss mindestens morgen sein'), // tomorrow or later

    title: yup
      .string()
      .required('Bezeichnung ist erforderlich'),

    reminder: yup
      .object()
      .required('Erinnerung ist erforderlich'),
  })
  .test(
    'reminder-valid',
    'Erinnerung liegt in der Vergangenheit',
    (values) => {
      if (!values.date || !values.reminder) return false;

      const reminderDays = reminderDaysMap[values.reminder.value] || 0;
      const reminderDate = new Date(values.date);
      reminderDate.setDate(reminderDate.getDate() - reminderDays);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return reminderDate > today;
    }
  );
