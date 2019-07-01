import React from 'react';

const Table = ({ title, data, className }) => {
  return (
    <div className={className}>
      {title && <h2>{title}</h2>}
      <table>
        <thead>
          <th>
            <td>Name</td>
            <td>Count</td>
          </th>
        </thead>
        <tbody>
          {data.map(({ id, label, value }) => (
            <tr key={id}>
              <td>{label || id}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
