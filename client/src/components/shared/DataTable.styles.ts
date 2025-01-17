const styles = {
  table: {
    borderBottom: 'none',
    '& .MuiTableCell-root': {
      border: 'solid 1px #c0c0c0',
      padding: '2px 4px',
    },
    '& .MuiTableCell-head': {
      backgroundColor: '#c5e4ff',
    },
  },
  pagination: {
    '& .MuiTablePagination-toolbar': {
      minHeight: 0,
    },
    '& .MuiIconButton-root': {
      padding: 2,
    },
  },
  actionCell: {
    width: 64,
  },
  editTextBox: {
    width: 'calc(100% - 8px)',
  },
  editDatePicker: {
    width: 132,
  } ,
  editNumberField: {
    width: 40,
  },
};

export default styles;
