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

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
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
            {
                data.map((row, index) => { 
                  return (
                    <TableRow key={index}>
                      {
                        Object.keys(row).map((colKey) => { 
                          return (<TableCell key={colKey}>{row[colKey]}</TableCell>); 
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
