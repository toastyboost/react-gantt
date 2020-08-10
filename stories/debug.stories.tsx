import * as React from 'react';
import { DatePicker, Tag } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import { Gantt } from '../src';
import { ganttData } from '../src/data';

const { RangePicker } = DatePicker;

const start = '2020-08-01';
const end = '2020-08-31';

export const withGantt = () => {
  const [date, setDate] = React.useState([start, end]);

  const data = ganttData({ start: date[0], end: date[1] });

  return (
    <>
      <PickerContainer>
        За период &nbsp;&nbsp;
        <RangePicker
          placeholder={['Начало', 'Конец']}
          onChange={(_: any, dateString: string[]) => {
            setDate(dateString);
          }}
        />
        &nbsp;&nbsp; Готовые периоды &nbsp;&nbsp;
        <Tag>Месяц</Tag>
        <Tag>Квартал</Tag>
        <Tag>Ассемент</Tag>
        <Tag>Год</Tag>
        <Tag>Все время</Tag>
      </PickerContainer>
      <Gantt data={data} start={date[0]} end={date[1]} />
    </>
  );
};

export default { title: 'Debug' };

const PickerContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1;
`;
