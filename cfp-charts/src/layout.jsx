import React, { useMemo } from 'react';

import data from './data';
import Pie from './pie';
import Geo from './geo';
import Line from './line';
import Table from './table';

import countryCodes from './country-codes.json';
import './layout.css';

const Layout = () => {
  const formats = useMemo(
    () => data.formatsCount.map(({ label, value }) => ({ id: label, value })),
    [],
  );
  const categories = useMemo(
    () =>
      data.categoriesCount.map(({ label, value }) => ({ id: label, value })),
    [],
  );
  const companies = useMemo(
    () => data.companiesCount.map(({ label, value }) => ({ id: label, value })),
    [],
  );
  const countries = useMemo(
    () =>
      data.countriesCount.map(({ id, label, value }) => {
        const country = countryCodes.find((c) => c['alpha-2'] === id);
        if (country) {
          return { id: country['alpha-3'], label: country['name'], value };
        }
        return { id, label, value };
      }),
    [],
  );
  const proposalsByDayLine = useMemo(
    () =>
      data.proposalsByDate
        .map(({ day, value }) => ({ x: day, y: value }))
        .reverse(),
    [],
  );
  const proposalsCumulByDayLine = useMemo(() => {
    const result = [];
    let cumul = 0;
    for (let day of proposalsByDayLine) {
      cumul += day.y;
      result.push({ ...day, y: cumul });
    }
    return result;
  }, [proposalsByDayLine]);

  return (
    <div className="layout vertical">
      <h1>Devfest Nantes 2019 - CFP stats</h1>
      <div className="horizontal">
        <div className="counter">
          <span className="counter_count">{data.proposalsCount}</span>
          <span className="counter_label">proposals</span>
        </div>
        <div className="counter">
          <span className="counter_count">{data.speakersCount}</span>
          <span className="counter_label">speakers</span>
        </div>
        <div className="counter">
          <span className="counter_count">{data.proposalsBySpeaker}</span>
          <span className="counter_label">proposals by speaker</span>
        </div>
      </div>
      <div className="horizontal">
        <Pie title="Formats" data={formats} className="item" />
        <Pie title="Categories" data={categories} className="item" />
      </div>
      <div className="horizontal">
        <Line title="Proposals by day" data={proposalsByDayLine} className="graph" />
        <Line title="Cumulated proposals" data={proposalsCumulByDayLine} className="graph" />
      </div>
      <div className="horizontal">
        <div className="vertical">
          <Pie title="Companies" data={companies.slice(0, 30)} className="item" />
          <Table data={companies} className="item" />
        </div>
        <div className="vertical">
          <Geo title="Countries" data={countries} className="item" />
          <Table data={countries} className="item" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
