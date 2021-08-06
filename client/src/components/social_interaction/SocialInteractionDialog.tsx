import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import AppDialog from '../shared/AppDialog';

type SocialInteractionDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

export const SocialInteractionDialog: React.FC<SocialInteractionDialogProps> = 
({ open, onSave, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [name, setName] = useState('');
    const [strHours, setStrHours] = useState('');
    const [socialDistance, setSocialDistance] = useState(false);

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleHoursChange = (e: any) => {
      setStrHours(e.target.value);
    };

    const handleSocialDistanceChange = (e: any) => {
      setSocialDistance(e.target.checked);
    };

    return (
      <AppDialog 
        open={open} 
        onSave={onSave} 
        onClose={onClose}
        title="Add Social Interaction"
        id="id-dialog-social"
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                required 
                id="si-name" 
                name="name" 
                label="Name" 
                value={name}
                onChange={handleNameChange} 
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                    disableToolbar
                    disableFuture
                    minDate={new Date(2020, 0, 1)}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="si-date"
                    name="date"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'Date',
                    }}
                    autoOk
                    required
                />                
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                required 
                id="si-hours" 
                name="hours" 
                label="Hours" 
                type="number"
                value={strHours}
                onChange={handleHoursChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControlLabel 
                 control={
                   <Checkbox 
                     id="si-social-distance" 
                     name="socialDistance" 
                     checked={socialDistance} 
                     onChange={handleSocialDistanceChange}
                    />} 
                 label="Social Distancing observed?"
            />
            </Grid>
          </Grid>
        </form>
      </AppDialog>
    );
};

export default SocialInteractionDialog;
