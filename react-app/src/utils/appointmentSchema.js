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
    .string()
    .required('Datum ist erforderlich')
    .test(
      'is-at-least-tomorrow',
      'Datum muss mindestens morgen sein',
      function (value) {
        if (!value) return false;
  
        const [year, month, day] = value.split('-').map(Number);
        const inputDate = new Date(year, month - 1, day);
  
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return (
          inputDate.getFullYear() > tomorrow.getFullYear() ||
          (inputDate.getFullYear() === tomorrow.getFullYear() &&
            inputDate.getMonth() > tomorrow.getMonth()) ||
          (inputDate.getFullYear() === tomorrow.getFullYear() &&
            inputDate.getMonth() === tomorrow.getMonth() &&
            inputDate.getDate() >= tomorrow.getDate())
        );
      }
    ),
    title: yup
      .string()
      .required('Bezeichnung ist erforderlich'),

    reminder: yup
      .object()
      .required('Erinnerung ist erforderlich'),
  })
  .test(
    {
      name: 'reminder-valid',
      message: 'Der Erinnerungstag liegt in der Vergangenheit...',
      test(values) {
        const { date, reminder } = values;
        if (!date || !reminder?.value) return false;
    
        const [year, month, day] = date.split('-').map(Number);
        const appointmentDate = new Date(year, month - 1, day);
        const reminderDays = reminder.value;
        const reminderDate = new Date(appointmentDate);
        reminderDate.setDate(reminderDate.getDate() - reminderDays);
    
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
        if (reminderDate < today) {
          // Manually create a field error on `reminder`
          throw this.createError({ path: 'reminder', message: this.message });
        }
    
        return true;
      }
    }
  );
