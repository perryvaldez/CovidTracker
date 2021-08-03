import React from 'react';
import { Container } from '@material-ui/core';
import P from '../markup/P';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <Container>
    <P align="center">Page Not Found. Back to <Link to="/">Dashboard</Link>.</P>
  </Container>
);

export default NotFound;
