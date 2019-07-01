const { isArray, deburr, toLower, kebabCase } = require('lodash')

const sanitize = (str) => kebabCase(deburr(toLower(str)))

const count = (keyOrKeys, counter, getLabel) => {
  if (isArray(keyOrKeys)) {
    keyOrKeys.forEach(key => countKey(key, counter, getLabel))
  } else {
    countKey(keyOrKeys, counter, getLabel)
  }
}

const countKey = (key =  'unknown', counter = [], getLabel) => {
  const current = counter.find(c => c.id === key)
  if (!current) {
    counter.push({
      id: key,
      label: getLabel ? getLabel(key) : key,
      value: 1,
    })
  } else {
    current.value = current.value + 1;
  }
}

const groupByDate = (secs) => {
  const date = new Date(1970, 0, 1); // Epoch
  date.setSeconds(secs);
  return date.toISOString().split('T')[0];
}

module.exports = {
  count,
  sanitize,
  groupByDate,
}