import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import utils from '../../lib/utils';
import AppDialog from '../shared/AppDialog';

type SocialInteractionDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

const minDate = new Date(2020, 0, 1);
const maxDate = utils.tomorrowDate();

export const SocialInteractionDialog: React.FC<SocialInteractionDialogProps> = 
({ open, onSave, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [name, setName] = useState('');
    const [strHours, setStrHours] = useState('');
    const [socialDistance, setSocialDistance] = useState(false);

    const [nameError, setNameError] = useState('');
    const [hoursError, setHoursError] = useState('');
    const [dateError, setDateError] = useState('');

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

    const handleOnSave = (e: any) => {
      let hasErrors = false;

      if(!name) {
        setNameError('Name is required.');
        hasErrors = hasErrors || true;
      }

      if(!strHours) {
        setHoursError('Hours is required.');
        hasErrors = hasErrors || true;
      }

      let hours = parseInt(strHours, 10);
      if(isNaN(hours)) {
        setHoursError('Invalid hours.');
        hasErrors = hasErrors || true;
      }

      if(hours < 0) {
        setHoursError('Hours must be greater than 0.');
        hasErrors = hasErrors || true;
      }

      if(!selectedDate) {
        setDateError('Date is required.');
        hasErrors = hasErrors || true;
      }

      if(selectedDate && utils.compareDates(selectedDate, minDate) < 0) {
        setDateError('Date must not be earlier than Jan 1, 2020.');
        hasErrors = hasErrors || true;
      }

      if(selectedDate && utils.compareDates(selectedDate, maxDate) >= 0) {
        setDateError('Date must not be a future date.');
        hasErrors = hasErrors || true;
      }

      if(!hasErrors) {
          onSave(e);
      }
    };

    return (
      <AppDialog 
        open={open} 
        onSave={handleOnSave} 
        onClose={onClose}
        title="Add Social Interaction"
        id="id-dialog-social"
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                required 
                error={!!nameError}
                helperText={nameError}
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
                    error={!!dateError}
                    helperText={dateError}
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
                error={!!hoursError}
                helperText={hoursError}
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
