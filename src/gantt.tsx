import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { CalendarContent, CalendarHeader } from './calendarLayout';
import { GenericStyles } from './styles';

export type Project = {
  project: string;
  start_time: string;
  end_time: string;
};

type GanttProps = {
  data: Project[];
};

export const Gantt = ({ data }: GanttProps) => {
  const start = moment().startOf('week').add(1, 'day').toISOString();
  const end = moment().endOf('week').add(1, 'day').toISOString();

  const currentRange = `${moment(start).format('DD-MM')} -- ${moment(
    end,
  ).format('DD-MM')}`;

  const tableData = data.reduce((acc, value) => {
    const { project, start_time, end_time } = value;

    return {
      ...acc,
      [project]: [
        { start_time, end_time },
        ...(acc[project] ? acc[project] : []),
      ],
    };
  }, {} as any);

  return (
    <>
      <GenericStyles />
      <Container>
        <Header>
          <CurrentRange>
            Где работал Дима с <br />
            {currentRange}
          </CurrentRange>
          <CalendarHeader start={start} end={end} data={tableData} />
        </Header>
        <Aside>
          <Projects>
            {Object.keys(tableData).map((project, key) => (
              <ProjectName key={key}>{project}</ProjectName>
            ))}
          </Projects>
        </Aside>
        <Content>
          <CalendarContent start={start} end={end} data={tableData} />
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
  min-height: 100vh;
  font-size: 1.6rem;
  color: #000;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: calc(100% - 20%);
  height: 100px;
  border-bottom: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  margin-left: calc(20% - 1px);
`;

const Aside = styled.div`
  width: 20%;
  height: 100%;
  border-top: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  min-height: 100vh;
`;

const Content = styled.div`
  width: 80%;
`;

const Projects = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.div`
  width: 100%;
  padding-left: 24px;
  border-bottom: 1px solid var(--border-color);
  line-height: 40px;
`;

const CurrentRange = styled.div`
  width: 100%;
  text-align: center;
`;
