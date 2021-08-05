import React from 'react';

type SocialInteractionDialogProps = {
  open: boolean,
  onClose: () => any,
};

export const SocialInteractionDialog: React.FC<SocialInteractionDialogProps> = 
({ open, onClose }) => {
    console.log('SocialInteractionDialog: ', { open });
    return (<div></div>);
};

export default SocialInteractionDialog;
