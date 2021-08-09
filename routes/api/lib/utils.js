const fieldMappings = {
  to: 'date',
  from: 'date'
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
        parms.date.push({ '$lte': queryParams[q] });  
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

