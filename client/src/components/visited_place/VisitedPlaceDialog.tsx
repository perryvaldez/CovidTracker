import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import utils from '../../lib/utils';
import api, { IVisitedPlaceData } from '../../lib/api';
import AppDialog from '../shared/AppDialog';

type VisitedPlaceDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (data: IVisitedPlaceData) => (e: any) => void,
};

const currentDate = utils.currentDate();
const minDate = new Date(2020, 0, 1);
const maxDate = utils.tomorrowDate(currentDate);

export const VisitedPlaceDialog: React.FC<VisitedPlaceDialogProps> = 
({ open, onSave, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [place, setPlace] = useState('');
    const [strHours, setStrHours] = useState('');
    const [crowded, setCrowded] = useState(false);

    const [placeError, setPlaceError] = useState('');
    const [hoursError, setHoursError] = useState('');
    const [dateError, setDateError] = useState('');

    const [autoSuggestOptions, setAutoSuggestOptions] = useState([] as string[]);

    const handleDateChange = (date: any) => {
      setSelectedDate(utils.extractDate(date));
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

      let hasPlaceError = false;
      if(!place) {
        setPlaceError('Place is required.');
        hasPlaceError = hasPlaceError || true;
        hasErrors = hasErrors || true;
      }

      if(!hasPlaceError) {
        setPlaceError('');
      }

      let hasHoursError = false;
      if(!strHours) {
        setHoursError('Hours is required.');
        hasHoursError = hasHoursError || true;
        hasErrors = hasErrors || true;
      }

      let hours = parseInt(strHours, 10);
      if(isNaN(hours)) {
        setHoursError('Invalid hours.');
        hasHoursError = hasHoursError || true;
        hasErrors = hasErrors || true;
      }

      if(hours < 0) {
        setHoursError('Hours must be greater than 0.');
        hasHoursError = hasHoursError || true;
        hasErrors = hasErrors || true;
      }

      if(!hasHoursError) {
        setHoursError('');
      }

      let hasDateError = false;
      if(!selectedDate) {
        setDateError('Date is required.');
        hasDateError = hasDateError || true;
        hasErrors = hasErrors || true;
      }

      if(selectedDate && utils.compareDates(selectedDate, minDate) < 0) {
        setDateError('Date must not be earlier than Jan 1, 2020.');
        hasDateError = hasDateError || true;
        hasErrors = hasErrors || true;
      }

      if(selectedDate && utils.compareDates(selectedDate, maxDate) >= 0) {
        setDateError('Date must not be a future date.');
        hasDateError = hasDateError || true;
        hasErrors = hasErrors || true;
      }

      if(!hasDateError) {
        setDateError('');
      }

      if(!hasErrors) {
          const data: IVisitedPlaceData = {
            place,
            date: utils.toDateTimeString(selectedDate),
            hours,
            isCrowded: crowded,
          };

          onSave(data)(e);
      }
    };

    const handleOnClose = (e: any) => {
      setSelectedDate(currentDate);
      setPlace('');
      setStrHours('');
      setCrowded(false);
      setPlaceError('');
      setHoursError('');
      setDateError('');

      onClose(e);
    };

    const handleAutoCompleteInputChange = (event: any, value: string, reason: string) => {
      if(reason === 'input' || reason === 'clear') {
        utils.runAsync(async () => {
          const suggestions = await api.getVisitedPlacesAvailablePlaces( reason === 'input' ? value : '');
          setAutoSuggestOptions(suggestions);
        });
      }
    };

    useEffect(() => {
      utils.runAsync(async () => {
        const suggestions = await api.getVisitedPlacesAvailablePlaces();
        setAutoSuggestOptions(suggestions);
      });
    }, []);

    return (
      <AppDialog 
        open={open} 
        onSave={handleOnSave} 
        onClose={handleOnClose}
        title="Add Visited Place"
        id="id-dialog-visited"
      >
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete 
                freeSolo
                options={autoSuggestOptions}
                filterOptions={(x) => x}
                onInputChange={handleAutoCompleteInputChange}
                renderInput={(params) => (
                  <TextField 
                    {...params}
                    required 
                    error={!!placeError}
                    helperText={placeError}
                    id="si-place" 
                    name="place" 
                    label="Place" 
                    value={place}
                    onChange={handlePlaceChange} 
                  />
                )}
              
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

