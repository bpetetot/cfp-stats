import React from 'react';

import { ResponsivePie } from '@nivo/pie';

const Pie = ({ title, data, className }) => (
  <div className={className}>
    {title && <h2>{title}</h2>}
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 70, bottom: 70, left: 70 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      animate={true}
    />
  </div>
);

export default Pie;
