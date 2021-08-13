import React, { useState } from 'react';
import { Checkbox, Container, FormControlLabel, Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Loader from '../shared/Loader';
import PageHeader from '../shared/PageHeader';
import styles from './VisitedPlaces.styles';

export const VisitedPlaces: React.FC = () => {
  const classes = makeStyles(styles)();

  const [displayLast14, setDisplayLast14] = useState(false);

  const handleChangeDisplayLast14 = (e: any) => {
    setDisplayLast14(e.target.checked);
  };

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
                <TableContainer >
                  <Table classes={{ root: classes.table }} size="small" padding="none" aria-label="Visited Places List">
                    <TableHead>
                      <TableRow>
                        <TableCell>Place</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Hours</TableCell>
                        <TableCell>Crowded?</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>                       
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Church</TableCell>
                        <TableCell>6/27/2021</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>No</TableCell>
                        <TableCell>[Edit] [Delete]</TableCell>
                      </TableRow>                       
                      <TableRow className={classes.alertRow}>
                        <TableCell>Wet Market</TableCell>
                        <TableCell>6/28/2021</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Yes</TableCell>
                        <TableCell>[Edit] [Delete]</TableCell>
                      </TableRow>                       
                      <TableRow>
                        <TableCell>Grocery</TableCell>
                        <TableCell>6/29/2021</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>No</TableCell>
                        <TableCell>[Edit] [Delete]</TableCell>
                      </TableRow>                       
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </form>
      </Container>
    </Loader>
  );
};

export default VisitedPlaces;
