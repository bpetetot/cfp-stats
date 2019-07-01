import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import world from './world.json';

const Geo = ({ title, data, className }) => (
  <div className={className}>
    {title && <h2>{title}</h2>}
    <ResponsiveChoropleth
      data={data}
      features={world.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="nivo"
      domain={[0, 300]}
      unknownColor="#eee"
      label="properties.name"
      projectionScale={150}
      borderWidth={0.5}
      legends={[
        {
          anchor: 'bottom',
          direction: 'column',
          justify: true,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: 'left-to-right',
        },
      ]}
    />
  </div>
);

export default Geo;
