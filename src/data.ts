import moment from 'moment';

export const ganttData = [
  // day 1
  {
    project: 'Leem',
    start_time: moment().toISOString(),
    end_time: moment().add(6, 'hours').toISOString(),
  },
  {
    project: 'RMR',
    start_time: moment().toISOString(),
    end_time: moment().add(2, 'hours').toISOString(),
  },
  // day 2
  {
    project: 'Leem',
    start_time: moment().add(1, 'day').toISOString(),
    end_time: moment().add(1, 'day').add(4, 'hour').toISOString(),
  },
  {
    project: 'RMR',
    start_time: moment().add(1, 'day').toISOString(),
    end_time: moment().add(1, 'day').add(4, 'hour').toISOString(),
  },
  // day 3
  {
    project: 'ToYou',
    start_time: moment().add(2, 'day').toISOString(),
    end_time: moment().add(2, 'day').add(2, 'hour').toISOString(),
  },
  {
    project: 'RMR',
    start_time: moment().add(2, 'day').toISOString(),
    end_time: moment().add(2, 'day').add(4, 'hour').toISOString(),
  },
  // day 4
  {
    project: 'Leem',
    start_time: moment().add(3, 'day').toISOString(),
    end_time: moment().add(3, 'day').add(2, 'hour').toISOString(),
  },
  {
    project: 'ToYou',
    start_time: moment().add(3, 'day').toISOString(),
    end_time: moment().add(3, 'day').add(2, 'hour').toISOString(),
  },
  {
    project: 'RMR',
    start_time: moment().add(3, 'day').toISOString(),
    end_time: moment().add(3, 'day').add(4, 'hour').toISOString(),
  },
  // day 5
  {
    project: 'Vocation',
    start_time: moment().add(4, 'day').toISOString(),
    end_time: moment().add(4, 'day').add(8, 'hour').toISOString(),
  },
  // day 6
  {
    project: 'PreSales',
    start_time: moment().add(5, 'day').toISOString(),
    end_time: moment().add(5, 'day').add(6, 'hour').toISOString(),
  },
  {
    project: 'RMR',
    start_time: moment().add(5, 'day').toISOString(),
    end_time: moment().add(5, 'day').add(2, 'hour').toISOString(),
  },
];

// Дима
// Январь:
// – 75% Leem
// – 25% Организационные задачи
// Февраль:
// – 50% Leem
// – 50% Организационные задачи
// Март:
// – 25% ToYou
// – 50% Организационные задачи
// – 25% Неутилизация
// Апрель:
// – 25% ToYou
// – 25% Leem
// – 50% Организационные задачи
// Май:
// Отпуск
// Июнь:
// – 75% Пресейлы
// – 25% Организационные задачи
// отдельно в июне с 20 по 24 100% iTrace
