import moment from 'moment';

type RangeBetween = {
  start: string;
  end: string;
  include?: boolean;
};

export const getMonthsInRange = ({ start, end }: RangeBetween): string[] => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [] as string[];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    timeValues.push(dateStart.format('YYYY-MM'));
    dateStart.add(1, 'month');
  }

  return timeValues;
};

export const getDaysInRange = ({ start, end }: RangeBetween): string[] => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [] as string[];

  while (dateEnd > dateStart || dateStart.format('D') === dateEnd.format('D')) {
    timeValues.push(dateStart.format('YYYY-MM-DD'));
    dateStart.add(1, 'day');
  }

  return timeValues;
};

export function getWorktimeCombinations() {
  const arr = [
    [0, 1, 1, 6],
    [0, 1, 2, 2], // low - 3
    [0, 1, 2, 5],
    [0, 1, 3, 4, 1], // high + 1
    [0, 1, 7, 2], // high + 2
    [0, 2, 2, 2], // low - 2
    [0, 2, 2, 4],
    [0, 2, 3, 3],
    [0, 2, 6, 1], // high + 1
    [0, 3, 5],
    [0, 4, 4, 3], // high + 3
    [0, 8],
  ];
  return arr;
}

export function getColors() {
  return [
    // '#eb2f96',
    '#fa541c',
    '#a0d911',
    '#52c41a',
    // '#13c2c2',
    '#1890ff',
    '#2f54eb',
    '#722ed1',
  ];
}
