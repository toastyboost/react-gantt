import moment from 'moment';
import { getWorktimeCombinations } from './libs';

export type Project = {
  project: string;
  start_time: string;
  end_time: string;
  hours: number;
};

const dateFormat = 'YYYY-MM-DD HH:mm';
const projectsNames = [
  'Leem',
  'RMR',
  'ToYou',
  'Presales',
  'Отпуск',
  'Больничный',
];

const workHoursCombinations = getWorktimeCombinations();

const getRandomHour = () =>
  workHoursCombinations[
    Math.floor(Math.random() * workHoursCombinations.length)
  ];

const getRandomProject = () =>
  projectsNames[Math.floor(Math.random() * projectsNames.length)];

type GanttData = {
  start: string;
  end: string;
};

export const ganttData = ({ start, end }: GanttData): Project[] => {
  const daysBetween = Math.abs(moment(end).diff(moment(start), 'days'));
  let currentDay = 0;

  let projects = [] as Project[];

  while (currentDay < daysBetween) {
    currentDay++;

    const now = moment(start)
      .startOf('month')
      .add(currentDay, 'day')
      .add(8, 'hour');

    const isWeekends = now.day() === 0 || now.day() === 6;

    if (!isWeekends) {
      const randomHours = getRandomHour();

      randomHours.map((hour, key) => {
        projects.push({
          project: getRandomProject(),
          start_time: now.add(hour - hour[key + 1], 'hours').format(dateFormat),
          end_time: now.add(hour, 'hours').format(dateFormat),
          hours: hour,
        });
      });
    }
  }

  return projects
    .filter((item) => item.hours !== 0)
    .sort((a, b) =>
      moment.utc(moment(a.start_time)).diff(moment.utc(moment(b.end_time))),
    );
};
