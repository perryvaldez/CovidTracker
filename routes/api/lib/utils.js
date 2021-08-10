const fieldMappings = {
  to: 'date', // ISO 8601 date string
  from: 'date', // ISO 8601 date string
  distanced: 'isSocialDistancing', // Either '1' if true, or '0' if false
  crowded: 'isCrowded', // Either '1' if true, or '0' if false
};

const makeFilter = (queryParams) => {
  const filter = {};
  const parms = {};

  for(let q in queryParams) {
    if(fieldMappings[q]) {
      let key = fieldMappings[q];

      if(!parms[key]) {
        parms[key] = [];
      }

      if(q === 'from') {
        parms[key].push({ '$gte': queryParams[q] });  
      }

      if(q === 'to') {
        parms[key].push({ '$lte': queryParams[q] });  
      }

      if(q === 'distanced') {
        parms[key].push({ '$eq': (queryParams[q] === '1') });  
      }

      if(q === 'crowded') {
        parms[key].push({ '$eq': (queryParams[q] === '1') });  
      }
    }
  }

  for(let key in parms) {
    if(parms[key].length > 1) {
      filter[key] = {};

      for(let n in parms[key]) {
        filter[key] = { ...filter[key], ...parms[key][n] };
      }
    } else if(parms[key].length > 0) {
      filter[key] = parms[key][0];
    }
  }

  return filter;
};

module.exports = {
  makeFilter,
};

