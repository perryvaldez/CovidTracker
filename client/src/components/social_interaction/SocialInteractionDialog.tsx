import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import AppDialog from '../shared/AppDialog';
import DateFnsUtils from '@date-io/date-fns';

type SocialInteractionDialogProps = {
  open: boolean,
  onClose: (e: any) => void,
  onSave: (e: any) => void,
};

export const SocialInteractionDialog: React.FC<SocialInteractionDialogProps> = 
({ open, onSave, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField required id="si-name" label="Name" />
                </Grid>
                <Grid item xs={12}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="si-date"
                        label="Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                        }}
                        autoOk
                    />                
                </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      </AppDialog>
    );
};

export default SocialInteractionDialog;

/*
                <!-- 
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="si-date"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />                
                --> 
 */