import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import utils from '../../lib/utils';
import AppDialog from '../shared/AppDialog';

type VisitedPlaceDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

const minDate = new Date(2020, 0, 1);
const maxDate = utils.tomorrowDate();

export const VisitedPlaceDialog: React.FC<VisitedPlaceDialogProps> = 
({ open, onSave, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [place, setPlace] = useState('');
    const [strHours, setStrHours] = useState('');
    const [crowded, setCrowded] = useState(false);

    const [placeError, setPlaceError] = useState('');
    const [hoursError, setHoursError] = useState('');
    const [dateError, setDateError] = useState('');

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const handlePlaceChange = (e: any) => {
        setPlace(e.target.value);
    };

    const handleHoursChange = (e: any) => {
      setStrHours(e.target.value);
    };

    const handleCrowdedChange = (e: any) => {
      setCrowded(e.target.checked);
    };

    const handleOnSave = (e: any) => {
      let hasErrors = false;

      if(!placeError) {
        setPlaceError('Place is required.');
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
        title="Add Visited Place"
        id="id-dialog-visited"
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                required 
                error={!!placeError}
                helperText={placeError}
                id="si-place" 
                name="place" 
                label="Place" 
                value={place}
                onChange={handlePlaceChange} 
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                    disableToolbar
                    disableFuture
                    error={!!dateError}
                    helperText={dateError}
                    minDate={minDate}
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
                     id="si-crowded" 
                     name="crowded" 
                     checked={crowded} 
                     onChange={handleCrowdedChange}
                    />} 
                 label="Is Crowded?"
            />
            </Grid>
          </Grid>
        </form>
      </AppDialog>
    );
};

export default VisitedPlaceDialog;

