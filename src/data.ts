import moment from 'moment';

export type Project = {
  project: string;
  start_time: string;
  end_time: string;
  hours: number;
};

export const generateData = (): Project[] => {
  const projects = ['Leem', 'RMR', 'ToYou', 'Vocation', 'Presales'];
  let days = 0;

  const workHours = 8;
  const dateFormat = 'YYYY-MM-DD hh:mm';
  const data = [];

  while (days <= 3) {
    days++;

    let hours = 0;
    let dayProjects = [] as any;

    while (hours <= 8) {
      const randomHour = Math.floor(Math.random() * workHours);

      if (randomHour !== 0) {
        const wasteTime = hours + randomHour;

        const now = moment().startOf('day');

        dayProjects.push({
          project: projects[Math.floor(Math.random() * projects.length)],
          start_time: now.add(hours, 'hours').format(dateFormat),
          end_time: now.add(wasteTime, 'hours').format(dateFormat),
          hours: randomHour,
        });

        hours = wasteTime;
      }
    }

    data.push(dayProjects);
  }

  return data;
};

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
  // day 7
  // day 8
  {
    project: 'PreSales',
    start_time: moment().add(7, 'day').toISOString(),
    end_time: moment().add(7, 'day').add(6, 'hour').toISOString(),
  },
  {
    project: 'RMR',
    start_time: moment().add(7, 'day').toISOString(),
    end_time: moment().add(7, 'day').add(2, 'hour').toISOString(),
  },
  // day 9
  {
    project: 'ToYou',
    start_time: moment().add(8, 'day').toISOString(),
    end_time: moment().add(8, 'day').add(8, 'hour').toISOString(),
  },
];
