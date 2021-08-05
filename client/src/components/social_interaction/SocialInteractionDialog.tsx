import React from 'react';
import AppDialog from '../shared/AppDialog';

type SocialInteractionDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

export const SocialInteractionDialog: React.FC<SocialInteractionDialogProps> = 
({ open, onSave, onClose }) => {
    return (
      <AppDialog 
        open={open} 
        onSave={onSave} 
        onClose={onClose}
        title="Add Social Interaction"
        id="id-dialog-social"
      >
        <p>Social Interaction TODO...</p>
      </AppDialog>
    );
};

export default SocialInteractionDialog;
