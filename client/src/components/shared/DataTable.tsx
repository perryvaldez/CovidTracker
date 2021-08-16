import React from 'react';
import { makeStyles,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import styles from './DataTable.styles';

export interface IDataTableColumnDefinition {
  title?: string;
  index?: number;
  type?: 'string' | 'number' | 'boolean';
};

export interface IDataTableColumns {
  [key: string]: IDataTableColumnDefinition;
};

export interface IDataTableRow {
  [key: string]: any;
};

export type DataTableProps = {
  columns: IDataTableColumns,
  rowKey?: string,
  data: IDataTableRow[],
};

export const DataTable: React.FC<DataTableProps> = ({ columns, data, rowKey }) => {
  const classes = makeStyles(styles)();

  const sortedColumns = Object.keys(columns);

  sortedColumns.sort(
    (a, b) => (columns[a].index || 0) - (columns[b].index || 0)
  );

  return (
    <TableContainer >
      <Table classes={{ root: classes.table }} size="small" padding="none" aria-label="Visited Places List">
        <TableHead>
          <TableRow>
            {
              sortedColumns.map((col) => (<TableCell key={col}>{columns[col].title}</TableCell>))
            }
            <TableCell>Action</TableCell>
          </TableRow>                       
        </TableHead>
        <TableBody>
            {
                data.map((row, index) => { 
                  return (
                    <TableRow key={rowKey ? row[rowKey] : index}>
                      {
                        sortedColumns.map((col) => {
                          return (<TableCell key={col}>{row[col]}</TableCell>); 
                        })
                      }
                      <TableCell>[Edit] [Delete]</TableCell>
                    </TableRow>
                  );
                })
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
