import React from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Loader from '../shared/Loader';
import P from '../markup/P';
import styles from './VisitedPlaces.styles';

export const VisitedPlaces: React.FC = () => {
  const classes = makeStyles(styles)();

  return (
    <Loader isLoading={false}>
      <Container disableGutters className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Box display="flex" alignItems="center" height="100%">
              <P>Visited Places</P>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Loader>
  );
};

export default VisitedPlaces;
