import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Project } from './gantt';

type HeaderProps = {
  end: string;
  start: string;
  currentRange?: 'week';
  data: {
    [key: string]: Project[];
  };
};

export const CalendarHeader: React.FC<HeaderProps> = ({
  end,
  start,
  currentRange = 'week',
}) => {
  const daysInRange = moment(end).diff(moment(start), 'days');

  const calendarDays = Array.apply(null, Array(daysInRange + 1)).map(
    (_, key) => ({
      weekDay: moment().day(key).add(1, 'day').format('dddd'),
    }),
  );

  return (
    <Container>
      <Days columns={daysInRange}>
        {calendarDays.map(({ weekDay }, key) => (
          <Day key={key}>{weekDay}</Day>
        ))}
      </Days>
    </Container>
  );
};

type ContentProps = {
  end: string;
  start: string;
  currentRange?: 'week';
  data: {
    [key: string]: Project[];
  };
};

type RowProps = {
  days: string[];
  data: Project[];
  range: 'week';
};

const Row: React.FC<RowProps> = ({ days, data }) => {
  const columns = Array.apply(null, Array(days));
  //   console.log(data, 'D');

  return (
    <RowContainer columns={days.length}>
      {days.map((colDate, key) => {
        const todayStart = moment(colDate).startOf('day');
        const todayEnd = moment(colDate).endOf('day');

        return (
          <Day key={key}>
            {data.map(
              ({ start_time, end_time }, tkey) =>
                moment(start_time).isBetween(todayStart, todayEnd) && (
                  <div key={tkey}>
                    {moment(end_time).diff(moment(start_time), 'hours')}ч.
                  </div>
                ),
            )}
          </Day>
        );
      })}
    </RowContainer>
  );
};

export const CalendarContent: React.FC<ContentProps> = ({
  end,
  start,
  data,
  currentRange = 'week',
}) => {
  const daysInRange = moment(end).diff(moment(start), 'days');
  const days = Array.apply(null, Array(daysInRange + 1)).map((_, key) =>
    moment().day(key).add(1, 'day').format('YYYY-MM-DD'),
  );

  return (
    <Container>
      {Object.keys(data).map((project, key) => (
        <Row days={days} data={data[project]} range={currentRange} key={key} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Day = styled.div`
  text-align: center;
  border-left: 1px solid var(--border-color);
`;

type DaysProps = {
  columns: number;
};

const Days = styled.div<DaysProps>`
  width: 100%;
  display: flex;
  border-top: 1px solid var(--border-color);

  ${Day} {
    width: calc(100% / ${(p) => p.columns});
  }
`;

const RowContainer = styled.div<DaysProps>`
  width: 100%;
  display: flex;

  ${Day} {
    width: calc(100% / ${(p) => p.columns});
    line-height: 40px;
    border-bottom: 1px solid var(--border-color);
  }
`;
