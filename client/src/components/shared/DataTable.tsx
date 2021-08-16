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

export interface IDataTableRowPredicateFn {
  [key: string]: (row: IDataTableRow, index: number) => boolean;
};

export type DataTableProps = {
  columns: IDataTableColumns,
  rowKey?: string,
  data: IDataTableRow[],
  highlightRowIf?: IDataTableRowPredicateFn,
};

export const DataTable: React.FC<DataTableProps> = ({ columns, data, rowKey, highlightRowIf }) => {
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
                  const optProps: {[key: string]: any} = {};

                  if(highlightRowIf) {
                    Object.keys(highlightRowIf).forEach((colorKey) => {
                      if(highlightRowIf[colorKey](row, index)) {
                        optProps.style = { backgroundColor: colorKey };
                      }
                    });
                  }

                  return (
                    <TableRow key={rowKey ? row[rowKey] : index} {...optProps}>
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
