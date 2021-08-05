import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

type SocialInteractionDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
};

export const SocialInteractionDialog: React.FC<SocialInteractionDialogProps> = 
({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="id-dialog-social">
        <DialogTitle id="id-dialog-social">Add Social Interaction</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <p>Social Interaction TODO...</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
};

export default SocialInteractionDialog;
