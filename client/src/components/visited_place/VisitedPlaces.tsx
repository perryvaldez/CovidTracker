import React, { useEffect, useState } from 'react';
import { Checkbox, Container, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import { useCustomSelector } from '../../lib/hooks';
import utils from '../../lib/utils';
import visitedPlacesStates from '../../store/states/visitedPlacesStates';
import { performVisitedPlacesChangePage, performVisitedPlacesFetchData, useVisitedPlacesDispatch } from '../../store/actions/visitedPlacesActions';
import Loader from '../shared/Loader';
import PageHeader from '../shared/PageHeader';
import DataTable, { IDataTableColumns, IDataTableRow } from '../shared/DataTable';
import styles from './VisitedPlaces.styles';

type GridData = {
  _id: number,
  place: string,
  date: string,
  hours: number,
  isCrowded: 'Yes' | 'No',
};

export const VisitedPlaces: React.FC = () => {
  const classes = makeStyles(styles)();

  const [displayLast14, setDisplayLast14] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const rowsPerPage = 10;

  const handleChangeDisplayLast14 = (e: any) => {
    setOffset(0);
    setCurrentPage(1);
    setDisplayLast14(e.target.checked);
    dispatch(performVisitedPlacesChangePage());
  };

  const handlePageChange = (e: any, page: number) => {
      setOffset((page - 1) * rowsPerPage);
      setCurrentPage(page);
      dispatch(performVisitedPlacesChangePage());
  };

  const columns: IDataTableColumns = {
    place: { title: 'Place', type: 'string', index: 1 },
    date: { title: 'Date', type: 'string', index: 2 },
    hours: { title: 'Hours', type: 'number', index: 3 },
    isCrowded: { title: 'Crowded?', type: 'string', index: 4 },
  };

  const highlightRowIf = { 
    '#ededed': (row: IDataTableRow, index: number) => (index % 2 !== 0),
    '#ffdce1': (row: IDataTableRow) => (row.isCrowded === 'Yes'),
  };

  const pageState = useCustomSelector(state => state.visitedPlaces);
  const dispatch = useVisitedPlacesDispatch();

  const currentDate = utils.currentDate();
  const currentDateMaxTimeString = utils.toDateTimeString(utils.maxTime(currentDate));

  const last14DaysDate = utils.dateAddDays(currentDate, -14 + 1);
  const last14DaysMinTimeString = utils.toDateTimeString(utils.minTime(last14DaysDate));

  const totalRows = pageState.payload.totalCount;

  const data = pageState.payload.data.map((item) => {
    const ret: GridData = {
      _id: item._id,
      place: item.place,
      hours: item.hours,
      isCrowded: item.isCrowded ? 'Yes' : 'No',
      date: utils.toShortDate(new Date(item.date)),
    };

    return ret;
  });

  useEffect(() => {
    const filter: {[key: string]: any} = { to: currentDateMaxTimeString };
    if (displayLast14) {
      filter.from = last14DaysMinTimeString;
    }

    if(pageState.stateName === visitedPlacesStates.START) {
      dispatch(performVisitedPlacesFetchData(filter, rowsPerPage, offset));
    }

    if(pageState.stateName === visitedPlacesStates.OUTDATED_DATA) {
      dispatch(performVisitedPlacesFetchData(filter, rowsPerPage, offset));
    }
  }, [pageState, dispatch, currentDateMaxTimeString, last14DaysMinTimeString, displayLast14, rowsPerPage, offset]);

  return (
    <Loader isLoading={false}>
      <Container disableGutters className={classes.container}>
        <PageHeader text="Visited Places List" className={classes.header} />
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={displayLast14} 
                        onChange={handleChangeDisplayLast14} 
                        name="last14" 
                      />}
                    label="Display records within last 14 days"
                  />                  
              </Grid>
              <Grid item xs={12}>
                <DataTable 
                  columns={columns} 
                  data={data} 
                  rowKey="_id" 
                  highlightRowIf={highlightRowIf}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  totalRows={totalRows}
                  onPageChange={handlePageChange}
                />
              </Grid>
            </Grid>
          </form>
      </Container>
    </Loader>
  );
};

export default VisitedPlaces;
