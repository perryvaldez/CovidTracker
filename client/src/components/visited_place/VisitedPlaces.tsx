import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import { useCustomSelector } from '../../lib/hooks';
import { PageMode } from '../../lib/page';
import utils from '../../lib/utils';
import { IVisitedPlaceData } from '../../lib/api';
import visitedPlacesStates from '../../store/states/visitedPlacesStates';
import { performVisitedPlacesAddData, performVisitedPlacesChangePage, performVisitedPlacesFetchData, useVisitedPlacesDispatch } from '../../store/actions/visitedPlacesActions';
import Loader from '../shared/Loader';
import PageHeader from '../shared/PageHeader';
import DataTable, { ColumnClassNames, IDataTableColumns, IDataTableRow } from '../shared/DataTable';
import VisitedPlaceDialog from './VisitedPlaceDialog';
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

  const pageState = useCustomSelector(state => state.visitedPlaces);
  const dispatch = useVisitedPlacesDispatch();

  const [pageMode, setPageMode] = useState(PageMode.VIEW);

  const [displayLast14, setDisplayLast14] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(-1);

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

  const handleOpenDialog = (e: any) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (e: any) => {
    setOpenDialog(false);
  }

  const handleSaveDialog = (data: IVisitedPlaceData) => (e: any) => {
    setOffset(0);
    setCurrentPage(1)   
    dispatch(performVisitedPlacesAddData(data));
    setOpenDialog(false);
  };

  const handleEditRow = (e: any, row: any, rowIndex: number) => {
    console.log('VisitedPlaces: handleEditRow: ', { row, rowIndex });
    setPageMode(PageMode.EDIT);
    setEditRowIndex(rowIndex);
  };

  const handleUpdateRow = (e: any, row: any, rowIndex: number) => {
    // TODO
    console.log('VisitedPlaces: handleUpdateRow: ', { row, rowIndex });
    setPageMode(PageMode.VIEW);
    setEditRowIndex(-1);
  };

  const handleDeleteRow = (e: any, row: any, rowIndex: number) => {};

  const handleCancelRow = (e: any, row: any, rowIndex: number) => {
    // TODO
    setPageMode(PageMode.VIEW);
    setEditRowIndex(-1);
  };

  const columns: IDataTableColumns = {
    place: { title: 'Place', type: 'string', index: 1 },
    date: { title: 'Date', type: 'Date', index: 2 },
    hours: { title: 'Hours', type: 'number', index: 3 },
    isCrowded: { title: 'Crowded?', type: 'boolean', index: 4 },
  };

  const columnClassNames: ColumnClassNames = {
    place: classes.colPlace,
    date: classes.colDate,
    hours: classes.colHours,
    isCrowded: classes.colIsCrowded,
  };

  const highlightRowIf = { 
    '#ededed': (row: IDataTableRow, index: number) => (index % 2 !== 0),
    '#ffdce1': (row: IDataTableRow) => (row.isCrowded),
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

    if(pageState.stateName === visitedPlacesStates.START) {
      dispatch(performVisitedPlacesFetchData(filter, rowsPerPage, offset));
    }

    if(pageState.stateName === visitedPlacesStates.OUTDATED_DATA) {
      dispatch(performVisitedPlacesFetchData(filter, rowsPerPage, offset));
    }
  }, [pageState, dispatch, currentDateMaxTimeString, last14DaysMinTimeString, displayLast14, rowsPerPage, offset]);

  return (
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
                        disabled={pageMode !== PageMode.VIEW}
                      />}
                    label="Display records within last 14 days"
                  />                  
              </Grid>
              <Grid item xs={12}>
                <Loader isLoading={pageState.stateName !== visitedPlacesStates.READY} withWrapper>
                  <DataTable 
                    ariaLabel="Visited Places List"
                    columns={columns} 
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
                    editRowIndex={editRowIndex}
                  />
                </Loader>
              </Grid>
              <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleOpenDialog} disabled={pageMode !== PageMode.VIEW}>Add Visited Place</Button>
              </Grid>
            </Grid>
        </form>
        <VisitedPlaceDialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          onSave={handleSaveDialog}
        />         
      </Container>
  );
};

export default VisitedPlaces;
