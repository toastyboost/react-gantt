import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Project } from './gantt';

type RangeTypes = 'week' | 'month';

type HeaderProps = {
  end: string;
  start: string;
  range?: RangeTypes;
  data: {
    [key: string]: Project[];
  };
};

const headerFormats = {
  week: 'dddd',
  month: 'dd',
};

export const CalendarHeader: React.FC<HeaderProps> = ({
  end,
  start,
  range = 'week',
}) => {
  const daysInRange = moment(end).diff(moment(start), 'days');

  const calendarDays = Array.apply(null, Array(daysInRange + 1)).map(
    (_, key) => ({
      weekDay: moment().day(key).add(1, 'day').format(headerFormats[range]),
      weekDayNumber: moment().day(key).add(1, 'day'),
    }),
  );

  return (
    <Container>
      <Days columns={daysInRange}>
        {calendarDays.map(({ weekDay, weekDayNumber }, key) => (
          <Day key={key} weekDay={Number(weekDayNumber)}>
            {weekDay}
          </Day>
        ))}
      </Days>
    </Container>
  );
};

type RowProps = {
  days: string[];
  data: Project[];
  range: RangeTypes;
};

const Row: React.FC<RowProps> = ({ days, data }) => {
  return (
    <RowContainer columns={days.length}>
      {days.map((colDate, key) => {
        const todayStart = moment(colDate).startOf('day');
        const todayEnd = moment(colDate).endOf('day');

        return (
          <Day key={key} weekDay={key}>
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
type ContentProps = {
  end: string;
  start: string;
  range?: RangeTypes;
  data: {
    [key: string]: Project[];
  };
};

export const CalendarContent: React.FC<ContentProps> = ({
  end,
  start,
  data,
  range = 'week',
}) => {
  const daysInRange = moment(end).diff(moment(start), 'days');
  const days = Array.apply(null, Array(daysInRange + 1)).map((_, key) =>
    moment().day(key).add(1, 'day').format('YYYY-MM-DD'),
  );

  return (
    <Container>
      {Object.keys(data).map((project, key) => (
        <Row days={days} data={data[project]} range={range} key={key} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Day = styled.div<{ weekDay: number }>`
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
