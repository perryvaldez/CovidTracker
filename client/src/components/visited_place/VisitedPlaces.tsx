import React, { useState } from 'react';
import { Checkbox, Container, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import Loader from '../shared/Loader';
import PageHeader from '../shared/PageHeader';
import DataTable, { IDataTableColumns } from '../shared/DataTable';
import styles from './VisitedPlaces.styles';

export const VisitedPlaces: React.FC = () => {
  const classes = makeStyles(styles)();

  const [displayLast14, setDisplayLast14] = useState(false);

  const handleChangeDisplayLast14 = (e: any) => {
    setDisplayLast14(e.target.checked);
  };

  const columns: IDataTableColumns = {
    place: { title: 'Place', type: 'string', index: 1 },
    date: { title: 'Date', type: 'string', index: 2 },
    hours: { title: 'Hours', type: 'number', index: 3 },
    isCrowded: { title: 'Crowded?', type: 'string', index: 4 },
  };

  const data = [
    {
      _id: 6,
      place: 'Church',
      date: '6/27/2021',
      hours: 1,
      isCrowded: 'No',
    },
    {
      _id: 7,
      place: 'Wet Market',
      date: '6/28/2021',
      hours: 3,
      isCrowded: 'Yes',
    },
    {
      _id: 8,
      place: 'Office',
      date: '6/29/2021',
      hours: 8,
      isCrowded: 'No',
    },
  ];

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
                <DataTable columns={columns} data={data} rowKey="_id" />
              </Grid>
            </Grid>
          </form>
      </Container>
    </Loader>
  );
};

export default VisitedPlaces;
