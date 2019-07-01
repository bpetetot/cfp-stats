import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const Line = ({ title, data, className }) => (
  <div className={className}>
    {title && <h2>{title}</h2>}
    <ResponsiveLine
      data={[
        {
          id: 'proposals',
          color: 'hsl(342, 70%, 50%)',
          data,
        },
      ]}
      margin={{ top: 50, right: 110, bottom: 100, left: 60 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        legendOffset: 36,
        legend: 'time',
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'proposals',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
    />
  </div>
);

export default Line;
