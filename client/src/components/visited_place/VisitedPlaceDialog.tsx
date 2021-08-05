import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

type VisitedPlaceDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
};

export const VisitedPlaceDialog: React.FC<VisitedPlaceDialogProps> = 
({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="id-dialog-visited">
        <DialogTitle id="id-dialog-visited">Add Visited Place</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Visited Place TODO...</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
};

export default VisitedPlaceDialog;

