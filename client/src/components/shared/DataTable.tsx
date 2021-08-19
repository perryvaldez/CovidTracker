import React from 'react';
import { makeStyles,Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import DataTablePageControls, { DataTablePageControlsProps } from './DataTablePageControls';
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
  totalRows?: number,
  rowsPerPage?: number,
  page?: number,
  onPageChange?: (e: any, page: number) => void,
};

export const DataTable: React.FC<DataTableProps> = ({ columns, data, rowKey, highlightRowIf, totalRows, rowsPerPage, page, onPageChange }) => {
  const classes = makeStyles(styles)();

  const sortedColumns = Object.keys(columns);

  sortedColumns.sort(
    (a, b) => (columns[a].index || 0) - (columns[b].index || 0)
  );

  const count = totalRows || 0;
  const rowsPerPageCount = rowsPerPage || 0;

  let pageNum = 0;
  if(typeof(page) === 'number' && page > 1) {
    pageNum = page - 1;
  }

  const pageControls = (props: DataTablePageControlsProps) => (<DataTablePageControls {...props} disabled={false} />);

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
        {
            typeof(rowsPerPage) === 'number' && (rowsPerPage > 1) && (
              <TableFooter>
                <TableRow>
                  <TablePagination 
                    rowsPerPageOptions={[rowsPerPageCount]}
                    count={count}
                    rowsPerPage={rowsPerPageCount}
                    page={pageNum}
                    onPageChange={(e, page) => { onPageChange && onPageChange(e, page + 1);  }}
                    className={classes.pagination}
                    ActionsComponent={(props: any) => pageControls(props)}
                  />
                </TableRow>
              </TableFooter>
            )
        }
      </Table>
    </TableContainer>
  );
};

export default DataTable;
