import React from 'react';
import AppDialog from '../shared/AppDialog';

type VisitedPlaceDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

export const VisitedPlaceDialog: React.FC<VisitedPlaceDialogProps> = 
({ open, onSave, onClose }) => {
    return (
      <AppDialog 
        open={open} 
        onSave={onSave} 
        onClose={onClose}
        title="Add Visited Place"
        id="id-dialog-visited"
      >
        <p>Visited Place TODO...</p>
      </AppDialog>
    );
};

export default VisitedPlaceDialog;

