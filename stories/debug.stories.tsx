import * as React from 'react';

import { Gantt } from '../src';
import { ganttData } from '../src/data';

export const withGantt = () => {
  return (
    <>
      <Gantt data={ganttData} />
    </>
  );
};

export default { title: 'Debug' };
