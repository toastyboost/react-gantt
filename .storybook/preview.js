import * as React from "react";

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];

export const parameters = {
  controls: { expanded: true },
};
