import React, { useEffect, useState } from 'react';
import { Checkbox, Container, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import { useCustomSelector } from '../../lib/hooks';
import utils from '../../lib/utils';
import socialInteractionsStates from '../../store/states/socialInteractionsStates';
import { performSocialInteractionsChangePage, performSocialInteractionsFetchData, useSocialInteractionsDispatch } from '../../store/actions/socialInteractionsActions';
import Loader from '../shared/Loader';
import PageHeader from '../shared/PageHeader';
import DataTable, { IDataTableColumns, IDataTableRow } from '../shared/DataTable';
import styles from './SocialInteractions.styles';

type GridData = {
  _id: number,
  name: string,
  date: string,
  hours: number,
  isSocialDistancing: 'Yes' | 'No',
};

export const SocialInteractions: React.FC = () => {
  const classes = makeStyles(styles)();

  const [displayLast14, setDisplayLast14] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const rowsPerPage = 10;

  const handleChangeDisplayLast14 = (e: any) => {
    setDisplayLast14(e.target.checked);
  };

  const handlePageChange = (e: any, page: number) => {
      setOffset((page - 1) * rowsPerPage);
      setCurrentPage(page);
      dispatch(performSocialInteractionsChangePage());
  };

  const columns: IDataTableColumns = {
    name: { title: 'Person', type: 'string', index: 1 },
    date: { title: 'Date', type: 'string', index: 2 },
    hours: { title: 'Hours', type: 'number', index: 3 },
    isSocialDistancing: { title: 'Practicing SD?', type: 'string', index: 4 },
  };

  const highlightRowIf = { 
    '#ededed': (row: IDataTableRow, index: number) => (index % 2 !== 0),
    '#ffdce1': (row: IDataTableRow) => (row.isSocialDistancing === 'No'),
  };

  const pageState = useCustomSelector(state => state.socialInteractions);
  const dispatch = useSocialInteractionsDispatch();

  const currentDate = utils.currentDate();
  const currentDateMaxTimeString = utils.toDateTimeString(utils.maxTime(currentDate));

  const totalRows = pageState.payload.totalCount;

  const data = pageState.payload.data.map((item) => {
    const ret: GridData = {
      _id: item._id,
      name: item.name,
      hours: item.hours,
      isSocialDistancing: item.isSocialDistancing ? 'Yes' : 'No',
      date: utils.toShortDate(new Date(item.date)),
    };

    return ret;
  });

  useEffect(() => {
    if(pageState.stateName === socialInteractionsStates.START) {
      dispatch(performSocialInteractionsFetchData({ to: currentDateMaxTimeString }, rowsPerPage, offset));
    }

    if(pageState.stateName === socialInteractionsStates.OUTDATED_DATA) {
      dispatch(performSocialInteractionsFetchData({ to: currentDateMaxTimeString }, rowsPerPage, offset));
    }
  }, [pageState, dispatch, currentDateMaxTimeString, rowsPerPage, offset]);

  return (
    <Loader isLoading={false}>
      <Container disableGutters className={classes.container}>
        <PageHeader text="Social Interactions List" className={classes.header} />
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

export default SocialInteractions;
