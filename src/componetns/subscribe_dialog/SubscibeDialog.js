import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel,Radio, RadioGroup,  TextField } from "@mui/material";
import { useForm, Controller } from 'react-hook-form'
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './SubscribeDialog.css'
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {formatUTC, shortDate } from '../../services/dateUtils';
import { TimePicker } from '@mui/lab';



export const SubscribeDialog = ({dataWebsite, OnSubscribeSelect}) => {
    const dateNow = new Date()
    const [frequncy, setFrequncy] = React.useState(false);

    const handleChange = (event) => {
      setFrequncy(event.target.value);
    };
    const { control, handleSubmit,setValue, getValues } = useForm({
        defaultValues: {
          date: dateNow,
          startTime: dateNow,
          endTime: dateNow,
          frequncy: "once"
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
        date: shortDate(data.date),
        startTime: formatUTC(data.startTime),
        endTime: formatUTC(data.endTime),
        frequncy: frequncy
      }
      OnSubscribeSelect(dataWebsite.data)
    };

    const close = () => OnSubscribeSelect(undefined)

    return (<>
      <Dialog
        fullWidth
        transi
        open={dataWebsite.open}
        className='dialog'
        onClose={close}
        // onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <form className='minus-margin-top-sx' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                name="date"
                control={control}
                render={({field}) => <>
                    <MobileDatePicker
                        {...field}
                        label="Date"
                        onChange={handleDate}
                        inputFormat="MM/dd/yyyy"
                        value={getValues('date')}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </>}/>
                <Controller
                name="startTime"
                control={control}
                render = {({field}) => <>
                    <TimePicker
                    {...field}
                    label="Start time"
                    value={getValues('startTime')}
                    onChange={handleStartTime}
                    renderInput={(params) => <TextField {...params} />}
                /> </>} />
                <Controller
                    name="endTime"
                    control={control}
                    render = {({field}) => <>
                        <TimePicker
                        {...field}
                        label="End time"
                        value={getValues('endTime')}
                        onChange={handleEndTime}
                        renderInput={(params) => <TextField {...params} />}
                        /> </>} />
            </LocalizationProvider>
            <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Frequency</FormLabel>
          <RadioGroup
            row 
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={frequncy}
            onChange={handleChange}
          >
            <FormControlLabel value={false} control={<Radio />} label="Once" />
            <FormControlLabel value={true} control={<Radio />} label="Every Week" />
          </RadioGroup>
        </FormControl>
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