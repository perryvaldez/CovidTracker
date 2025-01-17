import React, { useEffect, useState } from 'react';
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
  TableSortLabel,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { PageMode, SortDirectionType } from '../../lib/page';
import utils from '../../lib/utils';
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
  sortBy?: string,
  highlightRowIf?: IDataTableRowPredicateFn,
  totalRows?: number,
  rowsPerPage?: number,
  page?: number,
  disabledPageControls?: boolean,
  pageMode?: PageMode,
  editRowIndex?: number,
  ariaLabel?: string,
  onPageChange?: (e: any, page: number) => void,
  onEditRow?: (e: any, row: any, rowIndex: number, key: any) => void,
  onUpdateRow?: (e: any, row: any, rowIndex: number, key: any) => void,
  onDeleteRow?: (e: any, row: any, rowIndex: number, key: any) => void,
  onCancelRow?: (e: any, row: any, rowIndex: number, key: any) => void,
  onRequestSort?: (e: any, col: string) => void,
};

type Dict<T> = {[key: string]: T};
const convertDataIntoProperTypes = (data: Dict<any>, columnDefs: Dict<IDataTableColumnDefinition>) => {
  const result: Dict<any> = {};

  for(let col in data) {
    const type = columnDefs[col].type;

    if(type) {
      if(type === 'number') {
        result[col] = +data[col];
      } else if(type === 'boolean') {
        result[col] = !!data[col];
      } else if(type === 'Date') {
        let date: Date;
        const match = data[col].match(/^\s*\d\d\d\d-\d\d-\d\d\s*$/);

        if(match) {
          result[col] = utils.dateStampToISOString(data[col]);
        } else {
          // Attempt to let JavaScript parse the date
          date = new Date(data[col]);
          result[col] = date.toISOString();
        }
      } else {
        result[col] = data[col];
      }
    } else {
      result[col] = data[col];
    }

  }

  return result;
};

export const DataTable: React.FC<DataTableProps> = 
({ 
  columns, data, sortBy, rowKey, highlightRowIf, totalRows, rowsPerPage, page, disabledPageControls, pageMode, 
  editRowIndex, onPageChange, onEditRow, onUpdateRow, onDeleteRow, onCancelRow, columnClassNames, ariaLabel, onRequestSort,
 }) => {
  const emptyDict: {[key: string]: any} = {};
  const [colValues, setColValues] = useState(emptyDict);

  const classes = makeStyles(styles)();

  const handleClickEdit = (index: number, row: any, key: any) => (e: any) => { 
    if(onEditRow) {
      onEditRow(e, row, index, key);
    }
  };

  const handleClickUpdate = (index: number, row: any, key: any) => (e: any) => {
    if(onUpdateRow) {
      onUpdateRow(e, row, index, key);
    }
  };

  const handleClickCancel = (index: number, row: any, key: any) => (e: any) => { 
    if(onCancelRow) {
      onCancelRow(e, row, index, key);
    }
  };

  const handleClickDelete = (index: number, row: any, key: any) => (e: any) => {
    if(onDeleteRow) {
      onDeleteRow(e, row, index, key);
    }
  };

  const handleChangeInternalField = (col: string) => (e: any) => {
    const newColValues = { ...colValues, [col]: e.target.value };
    setColValues(newColValues);
  };

  const handleChangeInternalCheckbox = (col: string) => (e: any) => {
    const newColValues = { ...colValues, [col]: e.target.checked };
    setColValues(newColValues);
  };

  const handleClickSort = (sortColumn: string) => (e: any) => {
    if(onRequestSort) {
      onRequestSort(e, sortColumn);
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

  const isRowInEditMode = (index: number) => (typeof(editRowIndex) === 'number' && editRowIndex === index && pageMode === PageMode.EDIT);

  let sortColumn = sortedColumns[0];
  let sortDirection: SortDirectionType = 'asc';

  if(sortBy) {
    const sortMatch = sortBy.match(/^\s*([^:]+):(.+)\s*$/);
    if(sortMatch) {
      sortColumn = sortMatch[1];
      
      if (sortDirection === 'asc' || sortDirection === 'desc') {
        sortDirection = sortMatch[2] as SortDirectionType;
      }
    }
  }

  useEffect(() => {
    if(pageMode === PageMode.EDIT && typeof(editRowIndex) === 'number' && editRowIndex > -1) {
      const rowValues: {[key: string]: any} = {};

      for(let i in sortedColumns) {
        rowValues[sortedColumns[i]] = data[editRowIndex][sortedColumns[i]];
      }

      setColValues(rowValues);
    }
  }, [pageMode, editRowIndex, data]); // eslint-disable-line  react-hooks/exhaustive-deps

  return (
    <TableContainer >
      <Table classes={{ root: classes.table }} size="small" padding="none" aria-label={ariaLabel}>
        <TableHead>
          <TableRow>
            {
              sortedColumns.map((col) => { 
                const colOptProps: {[key: string]: any} = {};

                if(columnClassNames && columnClassNames[col]) {
                  colOptProps['className'] = columnClassNames[col];
                }

                return (
                  <TableCell key={col} {...colOptProps}>
                    <TableSortLabel 
                      active={col === sortColumn} 
                      direction={col === sortColumn ? sortDirection : 'asc'} 
                      onClick={handleClickSort(col)} 
                      disabled={disabledPageControls || pageMode === PageMode.EDIT}
                    >
                      {columns[col].title}
                    </TableSortLabel>
                  </TableCell>
                ); 
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

                          if(isRowInEditMode(index)) {
                            let control: React.ReactNode = (<input type="text" className={classes.editTextBox} value={colValues[col] || ''} onChange={handleChangeInternalField(col)} />);

                            if(columns[col].type === 'number') {
                              control = (<input type="number" className={classes.editNumberField} value={colValues[col] || '0'} onChange={handleChangeInternalField(col)} />);
                            }

                            if(columns[col].type === 'Date') {
                              const dateVal = utils.toDateStamp(new Date(colValues[col]));
                              control = (<input type="date" className={classes.editDatePicker} value={dateVal} onChange={handleChangeInternalField(col)} />);
                            }

                            if(columns[col].type === 'boolean') {
                              control = (<input type="checkbox" checked={!!colValues[col]} onChange={handleChangeInternalCheckbox(col)} />);
                            }

                            return (<TableCell key={col} {...colOptProps}>{control}</TableCell>); 
                          }


                          let displayVal = row[col];

                          if(columns[col].type === 'Date') {
                            displayVal = utils.toShortDate(new Date(row[col]));
                          }

                          if(columns[col].type === 'boolean') {
                            displayVal = row[col] ? 'Yes' : 'No';
                          }

                          return (<TableCell key={col} {...colOptProps}>{displayVal}</TableCell>); 
                        })
                      }
                      <TableCell align="center" className={classes.actionCell}>
                        {
                          (isRowInEditMode(index)) ? (
                            <DataTableActionButton title="Update" onClick={handleClickUpdate(index, convertDataIntoProperTypes(colValues, columns), rowKey ? row[rowKey] : undefined)} icon={(params) => (<SaveIcon {...params} />)} />
                          ) : (
                            <DataTableActionButton title="Edit" onClick={handleClickEdit(index, data[index], rowKey ? row[rowKey] : undefined)} disabled={pageMode && (pageMode !== PageMode.VIEW)} icon={(params) => (<EditIcon {...params} />)} />
                          )
                        }
                        {
                          (isRowInEditMode(index)) ? (
                            <DataTableActionButton title="Cancel" onClick={handleClickCancel(index, data[index], rowKey ? row[rowKey] : undefined)} icon={(params) => (<CancelIcon {...params} />)} />
                          ) : (
                            <DataTableActionButton title="Delete" onClick={handleClickDelete(index, data[index], rowKey ? row[rowKey] : undefined)} disabled={pageMode && (pageMode !== PageMode.VIEW)} icon={(params) => (<DeleteIcon {...params} />)} />
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
