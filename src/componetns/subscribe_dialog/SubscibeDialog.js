import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel,Grid,Radio, RadioGroup,  TextField } from "@mui/material";
import { useForm, Controller } from 'react-hook-form'
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './SubscribeDialog.css'
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {formatUTC, shortDate } from '../../services/dateUtils';
import { TimePicker } from '@mui/lab';



export const SubscribeDialog = ({dataWebsite, OnSubscribeSelect}) => {
    const dateNow = new Date()
    
    const { control, handleSubmit,setValue, getValues } = useForm({
        defaultValues: {
          date: dateNow,
          startTime: dateNow,
          endTime: dateNow,
          frequency: "once"
        }
      });
    
    const handleDate = (newValue) => {
      setValue('date', newValue)
    }
    const handleStartTime = (newValue) => {
      setValue('startTime', newValue)
    }
    const handleEndTime = (newValue) => {
      setValue('endTime', newValue)
    }

    const onSubmit = data => {
      dataWebsite.data = {
        ...data,
        date: shortDate(data.date),
        startTime: formatUTC(data.startTime),
        endTime: formatUTC(data.endTime)
      }
      OnSubscribeSelect(dataWebsite.data)
    };

    const close = () => OnSubscribeSelect(undefined)

    return (<>
      <Dialog
        fullWidth
        open={dataWebsite.open}
        className='dialog'
        onClose={close}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <form className='minus-margin-top-sx' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="date"
                control={control}
                render={({field}) => <>
                    <MobileDatePicker
                        {...field}
                        label="Date"
                        maxDate={new Date(dateNow.getTime() + (7 * 24 * 60 * 60 * 1000))}
                        disablePast
                        onChange={handleDate}
                        inputFormat="MM/dd/yyyy"
                        value={getValues('date')}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                        </>}/>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="startTime"
                control={control}
                render = {({field}) => <>
                    <TimePicker
                    {...field}
                    label="Start time"
                    value={getValues('startTime')}
                    onChange={handleStartTime}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                /> </>} />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="endTime"
                  control={control}
                  render = {({field}) => <>
                      <TimePicker
                      {...field}
                      label="End time"
                      value={getValues('endTime')}
                      onChange={handleEndTime}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                      /> </>} />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Frequency</FormLabel>
                <Controller 
                  rules={{ required: true }}
                  control={control}
                  name="frequency"
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel value={'once'} control={<Radio />} label="Once" />
                      <FormControlLabel value={'everyweek'} control={<Radio />} label="Every Week" />
                    </RadioGroup>
                  )}
                  />
              </FormControl>
            </Grid>
          </Grid>
        </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close}>
            Cancel
          </Button>
          <Button autoFocus type='submit'>
            Subscribe
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>)
}