const fieldMappings = {
  to: 'date', // ISO 8601 date string
  from: 'date', // ISO 8601 date string
  distanced: 'isSocialDistancing', // Either '1' if true, or '0' if false
  crowded: 'isCrowded', // Either '1' if true, or '0' if false
};

const ops = [
  'prefix',  // Format: prefix={field}:{searchValue}
];

const aggParams = [
  'name',
  'prefix',
];

const escapeRegexChars = (s = '') => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

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
    } else if (ops.includes(q)) {
      if(q === 'prefix') {
        const val = queryParams[q];
        const match = val.match(/^([^:]+):(.*)/);

        if(match !== null) {
          const key = match[1];

          // Escape also all regex special characters
          const searchVal = (match[2] || '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

          const regex = new RegExp(`^${searchVal}`, 'i');

          if(!parms[key]) {
            parms[key] = [];
          }

          parms[key].push({ '$regex': regex });
        }
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

const getPagination = (queryParams) => {
  const paginationFields = {
    limit: 0,
    offset: 0,
  };


  for(let q in queryParams) {
    if(Object.keys(paginationFields).includes(q)) {
      const num = +queryParams[q];

      if(typeof(num) === 'number' && !isNaN(num)) {
        paginationFields[q] = num;
      }
    }
  }

  return paginationFields;
};

const makeAggregate = async (model, queryParams) => {
  let fieldName = '';
  let prefix = '';

  for(let q in queryParams) {
    if(aggParams.includes(q)) {
      if (q === 'name') {
        fieldName = queryParams[q];
      }

      if (q === 'prefix') {
        prefix = queryParams[q];
      }
    }
  }

  if(!fieldName) {
    throw new Error('Missing parameter "name"');
  }

  const pipeLine = [];

  if(prefix) {
    const regex = new RegExp(`^${escapeRegexChars(prefix)}`, 'i');
    pipeLine.push({ $match: { [fieldName]: { $regex: regex } } });
  }

  pipeLine.push({ $group: { _id: `$${fieldName}` } });

  return model.aggregate(pipeLine).sort({ _id: 1 });
};

module.exports = {
  makeFilter,
  getPagination,
  makeAggregate,
};

