import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

type AppDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
  id: string,
  title: string,
};

export const AppDialog: React.FC<AppDialogProps> = 
({ open, onSave, onClose, id, title, children }) => {
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby={id}>
        <DialogTitle id={id}>{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
          <Button variant="contained" onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
};


export default AppDialog;