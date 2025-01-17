import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useCustomSelector } from '../../lib/hooks';
import { ColumnSortState, PageMode } from '../../lib/page';
import utils from '../../lib/utils';
import { ISocialInteractionData } from '../../lib/api';
import socialInteractionsStates from '../../store/states/socialInteractionsStates';
import { 
  performSocialInteractionsAddData, 
  performSocialInteractionsChangePage, 
  performSocialInteractionsDeleteData, 
  performSocialInteractionsEditData, 
  performSocialInteractionsFetchData, 
  useSocialInteractionsDispatch,
} from '../../store/actions/socialInteractionsActions';
import { performDashboardRefreshSocialData, useDashboardDispatch } from '../../store/actions/dashboardActions';
import { performNotificationRefreshData, useNotificationDispatch } from '../../store/actions/notificationActions';
import PageHeader from '../shared/PageHeader';
import Loader from '../shared/Loader';
import DataTable, { ColumnClassNames, IDataTableColumns, IDataTableRow } from '../shared/DataTable';
import SocialInteractionDialog from './SocialInteractionDialog';
import P from '../markup/P';
import styles from './SocialInteractions.styles';

export const SocialInteractions: React.FC = () => {
  const classes = makeStyles(styles)();

  const pageState = useCustomSelector(state => state.socialInteractions);
  const dispatch = useSocialInteractionsDispatch();
  const dashboardDispatch = useDashboardDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [pageMode, setPageMode] = useState(PageMode.VIEW);

  const [displayLast14, setDisplayLast14] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(-1);

  const [columnSort, setColumnSort] = useState<ColumnSortState>({ 
    name: 'asc',
    date: 'desc',
    hours: 'asc',
    isSocialDistancing: 'asc',
  });

  const [columnSortActive, setColumnSortActive] = useState('date');

  const rowsPerPage = 10;

  const handleChangeDisplayLast14 = (e: any) => {
    setOffset(0);
    setCurrentPage(1)   
    setDisplayLast14(e.target.checked);
    dispatch(performSocialInteractionsChangePage());
  };

  const handlePageChange = (e: any, page: number) => {
      setOffset((page - 1) * rowsPerPage);
      setCurrentPage(page);
      dispatch(performSocialInteractionsChangePage());
  };

  const handleOpenDialog = (e: any) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (e: any) => {
    setOpenDialog(false);
  }

  const handleSaveDialog = (data: ISocialInteractionData) => (e: any) => {
    setOffset(0);
    setCurrentPage(1)   
    dispatch(performSocialInteractionsAddData(data));
    dashboardDispatch(performDashboardRefreshSocialData());
    notificationDispatch(performNotificationRefreshData());
    setOpenDialog(false);
  };

  const handleEditRow = (e: any, row: any, rowIndex: number) => {
    setPageMode(PageMode.EDIT);
    setEditRowIndex(rowIndex);
  };

  const handleUpdateRow = (e: any, row: any, rowIndex: number, key: any) => {
    dispatch(performSocialInteractionsEditData(key, row));
    dashboardDispatch(performDashboardRefreshSocialData());
    notificationDispatch(performNotificationRefreshData());
    setPageMode(PageMode.VIEW);
    setEditRowIndex(-1);
  };

  const handleDeleteRow = (e: any, row: any, rowIndex: number, key: any) => {
    // eslint-disable-next-line no-restricted-globals
    const isOk = confirm(`Are you sure you want to delete this row?\n\n${JSON.stringify(row, null, 2)}`);

    if(isOk) {
      dispatch(performSocialInteractionsDeleteData(key));
      dashboardDispatch(performDashboardRefreshSocialData());
      notificationDispatch(performNotificationRefreshData());
      setPageMode(PageMode.VIEW);
      setEditRowIndex(-1);
    }
  };

  const handleCancelRow = (e: any) => {
    setPageMode(PageMode.VIEW);
    setEditRowIndex(-1);
  };

  const handleRequestSort = (e: any, col: string) => {
    const newSortState: ColumnSortState = {};
    Object.keys(columnSort).forEach((col) => { newSortState[col] = 'asc'; });

    if(col === columnSortActive) {
      const direction = (columnSort[col] === 'asc' ? 'desc' : 'asc');

      setColumnSort({
        ...newSortState,
        [col]: direction,
      });
    } else {
      setColumnSort(newSortState);
      setColumnSortActive(col);
    }

    dispatch(performSocialInteractionsChangePage());
  };

  const columns: IDataTableColumns = {
    name: { title: 'Person', type: 'string', index: 1 },
    date: { title: 'Date', type: 'Date', index: 2 },
    hours: { title: 'Hours', type: 'number', index: 3 },
    isSocialDistancing: { title: 'Practicing SD?', type: 'boolean', index: 4 },
  };

  const columnClassNames: ColumnClassNames = {
    name: classes.colName,
    date: classes.colDate,
    hours: classes.colHours,
    isSocialDistancing: classes.colIsSocialDistancing,
  };

  const highlightRowIf = { 
    '#ededed': (row: IDataTableRow, index: number) => (index % 2 !== 0),
    '#ffdce1': (row: IDataTableRow) => (!row.isSocialDistancing),
  };


  const currentDate = utils.currentDate();
  const currentDateMaxTimeString = utils.toDateTimeString(utils.maxTime(currentDate));

  const last14DaysDate = utils.dateAddDays(currentDate, -14 + 1);
  const last14DaysMinTimeString = utils.toDateTimeString(utils.minTime(last14DaysDate));

  const totalRows = pageState.payload.totalCount;

  const data = pageState.payload.data;

  useEffect(() => {
    const filter: {[key: string]: any} = { to: currentDateMaxTimeString };
    if (displayLast14) {
      filter.from = last14DaysMinTimeString;
    }

    if(pageState.stateName === socialInteractionsStates.START) {
      dispatch(performSocialInteractionsFetchData(filter, rowsPerPage, offset, `${columnSortActive}:${columnSort[columnSortActive]}`));
    }

    if(pageState.stateName === socialInteractionsStates.OUTDATED_DATA) {
      dispatch(performSocialInteractionsFetchData(filter, rowsPerPage, offset, `${columnSortActive}:${columnSort[columnSortActive]}`));
    }
  }, [pageState, dispatch, currentDateMaxTimeString, last14DaysMinTimeString, displayLast14, rowsPerPage, offset, columnSort, columnSortActive]);

  return (
      <Container disableGutters className={classes.container}>
        <PageHeader text="Social Interactions List" className={classes.header} />
        <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignContent="center">
                  <P className={classes.homeLink}><Link to="/">Home</Link></P>

                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={displayLast14} 
                        onChange={handleChangeDisplayLast14} 
                        name="last14"
                        disabled={pageMode !== PageMode.VIEW}                        
                      />}
                    label="Display records within last 14 days"
                    className={classes.labelLast14}
                  />                  
                  </Box>
              </Grid>
              <Grid item xs={12}>
                <Loader isLoading={pageState.stateName !== socialInteractionsStates.READY} withWrapper>
                  <DataTable 
                    ariaLabel="Social Interactions List"
                    columns={columns} 
                    sortBy={`${columnSortActive}:${columnSort[columnSortActive]}`}
                    columnClassNames={columnClassNames}
                    data={data} 
                    rowKey="_id" 
                    highlightRowIf={highlightRowIf}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    totalRows={totalRows}
                    pageMode={pageMode}
                    onPageChange={handlePageChange}
                    onEditRow={handleEditRow}
                    onUpdateRow={handleUpdateRow}
                    onDeleteRow={handleDeleteRow}
                    onCancelRow={handleCancelRow}
                    onRequestSort={handleRequestSort}
                    editRowIndex={editRowIndex}
                  />
                </Loader>
              </Grid>
              <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleOpenDialog} disabled={pageMode !== PageMode.VIEW}>Add Social Interaction</Button>
              </Grid>
            </Grid>
        </form>
        <SocialInteractionDialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          onSave={handleSaveDialog}
        />
      </Container>
  );
};

export default SocialInteractions;
