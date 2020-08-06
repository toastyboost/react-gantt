import moment from 'moment';

type RangeBetween = {
  start: string;
  end: string;
  include?: boolean;
};

export const getMonthsInRange = ({ start, end }: RangeBetween): string[] => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('YYYY-MM'));
    dateStart.add(1, 'month');
  }

  return timeValues;
};

export const getDaysInRange = ({ start, end }: RangeBetween): string[] => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format('D') === dateEnd.format('D')) {
    timeValues.push(dateStart.format('YYYY-MM-DD'));
    dateStart.add(1, 'day');
  }

  return timeValues;
};
