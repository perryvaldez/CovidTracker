import React from 'react';
import { 
  makeStyles,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TablePagination, 
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { PageMode } from '../../lib/page';
import DataTablePageControls, { DataTablePageControlsProps } from './DataTablePageControls';
import DataTableActionButton from './DataTableActionButton';
import styles from './DataTable.styles';

export interface IDataTableColumnDefinition {
  title?: string;
  index?: number;
  type?: 'string' | 'number' | 'boolean' | 'Date' ;
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

export type ColumnClassNames = {
  [key: string]: string,
};

export type DataTableProps = {
  columns: IDataTableColumns,
  columnClassNames?: ColumnClassNames,
  rowKey?: string,
  data: IDataTableRow[],
  rawDataArray: any[],
  highlightRowIf?: IDataTableRowPredicateFn,
  totalRows?: number,
  rowsPerPage?: number,
  page?: number,
  disabledPageControls?: boolean,
  pageMode?: PageMode,
  editRowIndex?: number,
  onPageChange?: (e: any, page: number) => void,
  onEditRow?: (e: any, row: any, rowIndex: number) => void,
  onUpdateRow?: (e: any, row: any, rowIndex: number) => void,
  onDeleteRow?: (e: any, row: any, rowIndex: number) => void,
  onCancelRow?: (e: any, row: any, rowIndex: number) => void,
};

export const DataTable: React.FC<DataTableProps> = 
({ 
  columns, data, rowKey, highlightRowIf, totalRows, rowsPerPage, page, disabledPageControls, pageMode, 
  editRowIndex, onPageChange, onEditRow, onUpdateRow, onDeleteRow, onCancelRow, rawDataArray,
  columnClassNames,
 }) => {
  const classes = makeStyles(styles)();

  const handleClickEdit = (index: number, row: any) => (e: any) => { 
    if(onEditRow) {
      onEditRow(e, row, index);
    }
  };

  const handleClickUpdate = (index: number, row: any) => (e: any) => {
    if(onUpdateRow) {
      onUpdateRow(e, row, index);
    }
  };

  const handleClickCancel = (index: number, row: any) => (e: any) => { 
    if(onCancelRow) {
      onCancelRow(e, row, index);
    }
  };

  const handleClickDelete = (index: number, row: any) => (e: any) => {
    if(onDeleteRow) {
      onDeleteRow(e, row, index);
    }
  };

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

  const pageControls = (props: DataTablePageControlsProps) => (<DataTablePageControls {...props} disabled={disabledPageControls || (pageMode && (pageMode !== PageMode.VIEW))} />);

  return (
    <TableContainer >
      <Table classes={{ root: classes.table }} size="small" padding="none" aria-label="Visited Places List">
        <TableHead>
          <TableRow>
            {
              sortedColumns.map((col) => { 
                const colOptProps: {[key: string]: any} = {};

                if(columnClassNames && columnClassNames[col]) {
                  colOptProps['className'] = columnClassNames[col];
                }

                return (<TableCell key={col} {...colOptProps}>{columns[col].title}</TableCell>); 
              })
            }
            <TableCell align="center" className={classes.actionCell}>Action</TableCell>
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
                          const colOptProps: {[key: string]: any} = {};

                          if(columnClassNames && columnClassNames[col]) {
                            colOptProps['className'] = columnClassNames[col];
                          }

                          if(typeof(editRowIndex) === 'number' && editRowIndex === index && pageMode === PageMode.EDIT) {
                            let control: React.ReactNode = (<input type="text" className={classes.editTextBox} value={rawDataArray[editRowIndex][col]} />);

                            if(columns[col].type === 'number') {
                              control = (<input type="number" className={classes.editNumberField} value={rawDataArray[editRowIndex][col]} />);
                            }

                            if(columns[col].type === 'Date') {
                              const dateObj = new Date(rawDataArray[editRowIndex][col]);
                              const yyyy = `${dateObj.getFullYear()}`;
                              const mm = `${dateObj.getMonth() + 1}`.padStart(2, '0');
                              const dd = `${dateObj.getDate()}`.padStart(2, '0');
                              const dateVal = `${yyyy}-${mm}-${dd}`;
                              control = (<input type="date" className={classes.editDatePicker} value={dateVal} />);
                            }

                            if(columns[col].type === 'boolean') {
                              control = (<input type="checkbox" checked={!!rawDataArray[editRowIndex][col]} />);
                            }

                            return (<TableCell key={col} {...colOptProps}>{control}</TableCell>); 
                          }

                          return (<TableCell key={col} {...colOptProps}>{row[col]}</TableCell>); 
                        })
                      }
                      <TableCell align="center" className={classes.actionCell}>
                        {
                          (typeof(editRowIndex) === 'number' && editRowIndex === index && pageMode === PageMode.EDIT) ? (
                            <DataTableActionButton title="Update" onClick={handleClickUpdate(index, rawDataArray[index])} icon={(params) => (<SaveIcon {...params} />)} />
                          ) : (
                            <DataTableActionButton title="Edit" onClick={handleClickEdit(index, rawDataArray[index])} disabled={pageMode && (pageMode !== PageMode.VIEW)} icon={(params) => (<EditIcon {...params} />)} />
                          )
                        }
                        {
                          (typeof(editRowIndex) === 'number' && editRowIndex === index && pageMode === PageMode.EDIT) ? (
                            <DataTableActionButton title="Cancel" onClick={handleClickCancel(index, rawDataArray[index])} icon={(params) => (<CancelIcon {...params} />)} />
                          ) : (
                            <DataTableActionButton title="Delete" onClick={handleClickDelete(index, rawDataArray[index])} disabled={pageMode && (pageMode !== PageMode.VIEW)} icon={(params) => (<DeleteIcon {...params} />)} />
                          )
                        }

                      </TableCell>
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
