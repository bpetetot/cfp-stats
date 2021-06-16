const fs = require('fs');
const { get, countBy } = require('lodash');
const { count, sanitize, groupByDate } = require('./utils');


const rawdata = fs.readFileSync('./data/export.json');
const data = JSON.parse(rawdata);

const proposals = data.talks;
const speakers = data.speakers;
const formats = data.formats;
const categories = data.categories;

const proposalsCount = proposals.length;
const speakersCount = speakers.length;
const proposalsBySpeaker = (proposalsCount / speakersCount).toFixed(2);

console.log('CFP statistics');
console.log(`${proposalsCount} proposals`);
console.log(`${speakersCount} speakers`);
console.log(`${proposalsBySpeaker} proposals by speaker`);

const getLabel = (labels) => (key) => {
  const label = labels.find((l) => l.id === key);
  if (label) {
    return label.name;
  }
  return key;
};

const formatsCount = [];
const categoriesCount = [];
let proposalsByDate;

proposals.forEach((p) => {
  count(p.formats, formatsCount, getLabel(formats));
  count(p.categories, categoriesCount, getLabel(categories));
  proposalsByDate = Object.entries(
    countBy(proposals.map((p) => groupByDate(p.createTimestamp._seconds))),
  ).map(([key, value]) => ({ day: key, value }));
});

const companiesCount = [];
const countriesCount = [];

speakers.forEach((s) => {
  count(sanitize(s.company), companiesCount);
  count(get(s, 'address.country.short_name'), countriesCount);
});

const result = {
  proposalsCount,
  speakersCount,
  proposalsBySpeaker,
  formatsCount,
  categoriesCount,
  companiesCount,
  countriesCount,
  proposalsByDate,
};

const sorting = (a, b) => b.value - a.value;
const display = ({ label, value }) => console.log(`${label}: ${value}`);

console.log('Formats');
formatsCount.sort(sorting).forEach(display);

console.log('Categories');
categoriesCount.sort(sorting).forEach(display);

console.log('Companies');
companiesCount.sort(sorting).forEach(display);

console.log('Countries');
countriesCount.sort(sorting).forEach(display);

console.log(JSON.stringify(result));
