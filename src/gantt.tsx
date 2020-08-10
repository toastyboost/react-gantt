import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';

import { Tag, Avatar } from 'antd';
import { GenericStyles } from './styles';
import { Timeline } from './timeline';
import { getDaysInRange } from './libs';
import { Project } from './data';

const colors = {
  low: '#f5222d',
  normal: '#52c41a',
  high: '#faad14',
};

type GanttProps = {
  data: Project[];
  start: string;
  end: string;
};

const avatars = [
  'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/segment-layout-default-images/floating-integrations/surveymonkey.png',
  'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/segment-layout-default-images/floating-integrations/slack.png',
  'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/segment-layout-default-images/floating-integrations/github.png',
  'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/segment-layout-default-images/floating-integrations/stripe.png',
  'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/segment-layout-default-images/floating-integrations/jira-core.png',
  'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/segment-layout-default-images/floating-integrations/gitlab.png',
];

export const Gantt = ({ data, start, end }: GanttProps) => {
  const range = 'month';

  const tableData = data.reduce((acc, value) => {
    const { project, start_time, end_time, hours } = value;

    return {
      ...acc,
      [project]: [
        { start_time, end_time, hours, project },
        ...(acc[project] ? acc[project] : []),
      ],
    };
  }, {} as any);

  const tableInfo = data.reduce((acc, value) => {
    const { project, hours } = value;
    return {
      ...acc,
      [project]: {
        load: [...(acc[project]?.load || []), hours],
      },
    };
  }, {} as any);

  const workingHours =
    getDaysInRange({
      start,
      end,
    }).filter((day) => !(moment(day).day() === 0 || moment(day).day() === 6))
      .length * 8;

  const totalHours = Object.keys(tableInfo)
    .map((projectName) =>
      tableInfo[projectName].load.reduce((a, b) => a + b, 0),
    )
    .reduce((a, b) => a + b, 0);

  const totalHoursPCT = Number(
    (
      (Object.keys(tableInfo)
        .map((projectName) =>
          tableInfo[projectName].load.reduce((a, b) => a + b, 0),
        )
        .reduce((a, b) => a + b, 0) /
        workingHours) *
      100
    ).toFixed(2),
  );

  return (
    <>
      <GenericStyles />
      <Container>
        <Aside>
          <ProjectName>Календарные дни &rarr;</ProjectName>
          <Projects>
            {Object.keys(tableInfo).map((projectName, key) => (
              <ProjectName key={key}>
                <Avatar size={18} src={avatars[key]} /> &nbsp; &nbsp;
                {projectName}
                <Tags>
                  <StatsTag color="#f2f4f5">
                    {tableInfo[projectName].load.reduce((a, b) => a + b, 0)}ч.
                  </StatsTag>
                  <StatsTag color="#f2f4f5">
                    {(
                      (tableInfo[projectName].load.reduce((a, b) => a + b, 0) /
                        workingHours) *
                      100
                    ).toFixed(2)}
                    %
                  </StatsTag>
                </Tags>
              </ProjectName>
            ))}
          </Projects>
          <Stats>
            <ProjectName>
              Общее
              <Tags>
                <Tag
                  color={
                    totalHours == workingHours
                      ? colors.normal
                      : totalHours < workingHours
                      ? colors.low
                      : colors.high
                  }
                >
                  {totalHours}
                  ч.
                </Tag>
                <Tag
                  color={
                    totalHoursPCT == 100
                      ? colors.normal
                      : totalHoursPCT < 100
                      ? colors.low
                      : colors.high
                  }
                >
                  {totalHoursPCT}%
                </Tag>
              </Tags>
            </ProjectName>
          </Stats>
        </Aside>
        <Content>
          <Timeline data={tableData} start={start} end={end} range={range} />
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

const Aside = styled.div`
  width: 26%;
  height: 100%;
  border-top: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  min-height: 100vh;
  margin-top: 20px;
`;

const Content = styled.div`
  width: 74%;
`;

const Tags = styled.div`
  margin-left: auto;
`;

const Projects = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stats = styled.div`
  display: flex;
`;

const ProjectName = styled.div`
  width: 100%;
  padding-left: 24px;
  border-bottom: 1px solid var(--border-color);
  line-height: 40px;
  display: flex;
  font-size: 1.4rem;
  align-items: center;
`;

const CurrentRange = styled.div`
  width: 100%;
  text-align: center;
`;

const StatsTag = styled(Tag)`
  color: rgba(0, 0, 0, 0.85);
`;
