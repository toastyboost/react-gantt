import * as React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { getMonthsInRange, getDaysInRange } from './libs';
import { Project } from './data';

type Ranges = 'year' | 'month';

type HeadProps = {
  start: string;
  end: string;
  range: Ranges;
  data: {
    [key: string]: Project[];
  };
};

const Head: React.FC<HeadProps> = ({ start, end, range }) => {
  const monthsBetween = getMonthsInRange({ start, end });
  const currentRange = `с ${moment(start).format('YYYY-MM')} по ${moment(
    end,
  ).format('YYYY-MM')}`;

  return (
    <HeadContainer>
      <HeadTitle>Где работал сотрдуник {currentRange}</HeadTitle>
      <Months>
        {monthsBetween.map((month, key) => (
          <Month key={key} months={monthsBetween.length} range={range}>
            {month as string}
          </Month>
        ))}
      </Months>
    </HeadContainer>
  );
};

const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeadTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.4rem;
  line-height: 30px;
  border-bottom: 1px solid var(--border-color);
`;

const Months = styled.div`
  display: flex;
  width: 100%;
`;

const columns = {
  year: 12,
  month: 1,
};

const Month = styled.div<{ months: number; range: Ranges; key: number }>`
  min-width: calc(100% / ${(p) => columns[p.range]});
  width: calc(100% / ${(p) => p.months});
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  font-size: 1.2rem;
  line-height: 20px;
`;

type DaysProps = {
  month: string;
  project: Project[];
};

const Days = ({ month, project }: DaysProps) => {
  const daysBetween = getDaysInRange({
    start: moment(month).startOf('month').format('YYYY-MM-DD'),
    end: moment(month).endOf('month').format('YYYY-MM-DD'),
  });

  const daysInMonth = moment(month).daysInMonth();
  console.log(project, 'pro');
  return (
    <DaysContainer>
      {daysBetween.map((day, key) => {
        const isToday = project.some(({ start_time, end_time }) => {
          const todayStart = moment(day).startOf('day');
          const todayEnd = moment(day).endOf('day');
          return moment(end_time).isBetween(todayStart, todayEnd);
        });

        return (
          <Day
            key={key}
            days={daysInMonth}
            highlight={isToday ? 'var(--green)' : 'transparent'}
          >
            {moment(day).format('DD')}
          </Day>
        );
      })}
    </DaysContainer>
  );
};

const DaysContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Day = styled.div<{ days: number; highlight?: string }>`
  width: calc(100% / ${(p) => p.days});
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  font-size: 1.2rem;
  line-height: 39px;
  background-color: ${(p) => p.highlight || 'transparent'};
`;

const Body: React.FC<HeadProps> = ({ start, end, range, data }) => {
  const monthsBetween = getMonthsInRange({ start, end });
  const rows = Object.keys(data);

  return (
    <BodyContainer>
      {rows.map((projectName, r) => (
        <Row>
          {monthsBetween.map((month, m) => (
            <Month key={m + r} months={monthsBetween.length} range={range}>
              <Days month={month} project={data[projectName]} />
            </Month>
          ))}
        </Row>
      ))}
    </BodyContainer>
  );
};

const Row = styled.div`
  display: flex;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type TimelineProps = {
  data: {
    [key: string]: Project[];
  };
  start: string;
  end: string;
  range: Ranges;
};

export const Timeline: React.FC<TimelineProps> = ({
  data,
  start,
  end,
  range,
}) => {
  const props = {
    start,
    end,
    range,
    data,
  } as const;

  return (
    <Container>
      <Head {...props} />
      <Body {...props} />
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  width: 100%;
`;
