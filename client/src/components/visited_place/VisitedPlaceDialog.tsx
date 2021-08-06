import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import AppDialog from '../shared/AppDialog';

type VisitedPlaceDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

export const VisitedPlaceDialog: React.FC<VisitedPlaceDialogProps> = 
({ open, onSave, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [place, setPlace] = useState('');
    const [strHours, setStrHours] = useState('');
    const [crowded, setCrowded] = useState(false);

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

    return (
      <AppDialog 
        open={open} 
        onSave={onSave} 
        onClose={onClose}
        title="Add Visited Place"
        id="id-dialog-visited"
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField 
                required 
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

