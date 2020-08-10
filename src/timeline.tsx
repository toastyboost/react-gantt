import * as React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { getMonthsInRange, getDaysInRange, getColors } from './libs';
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

const colors = {
  low: '#f5222d',
  normal: '#52c41a',
  high: '#faad14',
};

const getWorkHoursInMonth = (date: string) => {
  const start = moment(date).startOf('month').format();
  const end = moment(date).endOf('month').format();
  const d = getDaysInRange({ start, end }).filter(
    (day) => !(moment(day).day() === 0 || moment(day).day() === 6),
  ).length;
  return d * 8;
};

const Head: React.FC<HeadProps> = ({ start, end, range }) => {
  const monthsBetween = getMonthsInRange({ start, end });

  return (
    <HeadContainer>
      <Months>
        {monthsBetween.map((month, key) => (
          <Month key={key} months={monthsBetween.length} range={range}>
            <RangeTitle>
              {month} ({getWorkHoursInMonth(month)} рабочих часов)
            </RangeTitle>
            <Days month={month} />
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

const RangeTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  border-right: 1px solid var(--border-color);
  font-size: 1.2rem;
  line-height: 20px;
`;

type DaysProps = {
  month: string;
  projects?: Project[];
  color?: string;
};

const Days = ({ month, projects, color }: DaysProps) => {
  const daysBetween = getDaysInRange({
    start: moment(month).startOf('month').format('YYYY-MM-DD'),
    end: moment(month).endOf('month').format('YYYY-MM-DD'),
  });

  const daysInMonth = moment(month).daysInMonth();

  return (
    <DaysContainer>
      {daysBetween.map((day, key) => {
        const dayProjects = projects?.filter(({ start_time }) => {
          const dayStart = moment(day).startOf('day');
          const dayEnd = moment(day).endOf('day');

          return moment(start_time).isBetween(dayStart, dayEnd);
        });

        const isWeekend = moment(day).day() === 0 || moment(day).day() === 6;
        const duration =
          dayProjects?.map(({ hours }) => hours).reduce((a, b) => a + b, 0) ||
          null;

        const isWorkDay = Boolean(duration && color && Boolean(duration));

        const isFirst = !projects?.filter(({ start_time }) => {
          const dayStart = moment(day).subtract(1, 'day').startOf('day');
          const dayEnd = moment(day).subtract(1, 'day').endOf('day');

          return moment(start_time).isBetween(dayStart, dayEnd);
        }).length;

        const isLast = !projects?.filter(({ start_time }) => {
          const dayStart = moment(day).add(1, 'day').startOf('day');
          const dayEnd = moment(day).add(1, 'day').endOf('day');

          return moment(start_time).isBetween(dayStart, dayEnd);
        }).length;

        return (
          <Day
            key={key}
            days={daysInMonth}
            weekend={isWeekend}
            color={isWorkDay ? color : 'transparent'}
            isLast={isLast}
            isFirst={isFirst}
            className={isWorkDay ? 'workday' : ''}
            isWorkDay={isWorkDay}
          >
            {isWorkDay && (
              <WorkRange duration={duration || 0} color={color}>
                {duration}
              </WorkRange>
            )}
            {!Boolean(color) && moment(day).format('D')}
          </Day>
        );
      })}
    </DaysContainer>
  );
};

type TotalDaysProps = {
  month: string;
  projects?: {
    [key: string]: Project[];
  };
};

const TotalDays = ({ month, projects }: TotalDaysProps) => {
  const daysBetween = getDaysInRange({
    start: moment(month).startOf('month').format('YYYY-MM-DD'),
    end: moment(month).endOf('month').format('YYYY-MM-DD'),
  });

  const daysInMonth = moment(month).daysInMonth();

  return (
    <DaysContainer>
      {daysBetween.map((day, key) => {
        const dayWorkDuration: number = projects
          ? Object.keys(projects)
              .reduce((a, b) => {
                return [...a, ...projects[b]];
              }, [] as Project[])
              .filter(({ start_time }) => {
                const dayStart = moment(day).startOf('day');
                const dayEnd = moment(day).endOf('day');
                return moment(start_time).isBetween(dayStart, dayEnd);
              })
              .map(({ hours }) => hours)
              .reduce((a, b) => a + b, 0)
          : 0;

        return (
          <Day
            key={key}
            days={daysInMonth}
            weekend={false}
            color="transparent"
            isLast={false}
            isFirst={false}
            isWorkDay={false}
          >
            {dayWorkDuration !== 0 && (
              <WorkRangeTotal
                color={
                  dayWorkDuration == 8
                    ? colors.normal
                    : dayWorkDuration < 8
                    ? colors.low
                    : colors.high
                }
              >
                <WorkRange duration={0} style={{ width: 0, height: 0 }} />
                {dayWorkDuration}
              </WorkRangeTotal>
            )}
          </Day>
        );
      })}
    </DaysContainer>
  );
};

const Footer: React.FC<HeadProps> = ({ start, end, range, data }) => {
  const monthsBetween = getMonthsInRange({ start, end });

  return (
    <FooterContainer>
      {monthsBetween.map((month, m) => (
        <Month key={m} months={monthsBetween.length} range={range}>
          <TotalDays month={month} projects={data} />
        </Month>
      ))}
    </FooterContainer>
  );
};

const WorkRange = styled.div<{ duration: number; color?: string }>`
  width: ${(p) => (100 / 8) * p.duration}%;
  height: 16px;
  width: 100%;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
`;

const WorkRangeTotal = styled.div<{ color: string }>`
  color: #fff;
  background-color: ${(p) => p.color};
  font-size: 10px;
  line-height: 15px;
  border-radius: 3px;
  min-width: 16px;
`;

const Day = styled.div<{
  days: number;
  weekend: boolean;
  isLast: boolean;
  isFirst: boolean;
  color?: string;
  isWorkDay: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / ${(p) => p.days});
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  font-size: 1.2rem;
  min-height: 41px;
  background-color: ${(p) =>
    p.weekend ? 'rgb(242, 244, 245)' : 'transparent'};
  ${WorkRange} {
    background-color: ${(p) => p.color};
    border-radius: ${(p) => (p.isFirst ? '50px' : 0)}
      ${(p) => (p.isLast ? '50px' : 0)} ${(p) => (p.isLast ? '50px' : 0)}
      ${(p) => (p.isFirst ? '50px' : 0)};
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: var(--border-color);
  }

  &:before {
    left: 0;
    display: ${(p) => (p.isWorkDay ? 'none' : 'block')};
  }

  &:after {
    right: -1px;
    display: ${(p) => (p.isWorkDay ? 'none' : 'block')};
  }
`;

const DaysContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Body: React.FC<HeadProps> = ({ start, end, range, data }) => {
  const monthsBetween = getMonthsInRange({ start, end });
  const rows = Object.keys(data);
  const palette = rows.reduce((acc, val, key) => {
    return {
      ...acc,
      [val]: getColors()[key],
    };
  }, {});

  return (
    <BodyContainer>
      {rows.map((projectName, r) => (
        <Row key={r}>
          {monthsBetween.map((month, m) => (
            <Month key={m + r} months={monthsBetween.length} range={range}>
              <Days
                month={month}
                projects={data[projectName]}
                color={palette[projectName]}
              />
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

const FooterContainer = styled(BodyContainer)`
  background-color: rgba(0, 0, 0, 0.03);
  position: relative;
  flex-direction: row;
  &:before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.07);
    top: 0;
  }
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
      <Footer {...props} />
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  width: 100%;
`;
