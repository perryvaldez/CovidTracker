import React from 'react';
import { makeStyles,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import styles from './DataTable.styles';

export interface IDataTableColumnDefinition {
  title?: string;
  index?: number;
  type?: string;
};

export interface IDataTableColumns {
  [key: string]: IDataTableColumnDefinition;
};

export interface IDataTableRow {
  [key: string]: any;
};

export type DataTableProps = {
  columns: IDataTableColumns,
  keyColumn?: string,
  data: IDataTableRow[],
};

export const DataTable: React.FC<DataTableProps> = ({ columns }) => {
  const classes = makeStyles(styles)();

  return (
    <TableContainer >
        <Table classes={{ root: classes.table }} size="small" padding="none" aria-label="Visited Places List">
        <TableHead>
          <TableRow>
            {
              Object.keys(columns).map((col) => (<TableCell key={col}>{columns[col].title}</TableCell>))
            }
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
  );
};

export default DataTable;
