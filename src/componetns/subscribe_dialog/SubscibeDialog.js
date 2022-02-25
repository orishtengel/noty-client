import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel,Radio, RadioGroup,  TextField } from "@mui/material";
import TimePicker from '@mui/lab/TimePicker';
import { useForm, Controller } from 'react-hook-form'
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './SubscribeDialog.css'
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { formatAMPM } from '../../services/dateUtils';


export const SubscribeDialog = ({data, OnSubscribeSelect}) => {
    const date = new Date()
    const { control, handleSubmit } = useForm({
        defaultValues: {
          date: date,
          startTime: formatAMPM(date),
          endTime: formatAMPM(date),
          frequncy: "once"
        }
      });
    const onSubmit = data => console.log(data);

    const close = () => OnSubscribeSelect(undefined)

    return (<>
      <Dialog
      fullWidth
        open={data.open}
        className='dialog'
        onClose={close}
        // onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                name="date"
                control={control}
                render={({field}) => <>
                    <MobileDatePicker
                        {...field}
                        label="choose date"
                        inputFormat="MM/dd/yyyy"
                        value={new Date()}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </>}/>

                <Controller
                name="startTime"
                control={control}
                render = {({field}) => <>
                    <TimePicker
                    {...field}
                    label="choose start time"
                    value={new Date()}
                    renderInput={(params) => <TextField {...params} />}
                /> </>} />
                <Controller
                    name="endTime"
                    control={control}
                    render = {({field}) => <>
                        <TimePicker
                        {...field}
                        label="choose end time"
                        value={new Date()}
                        renderInput={(params) => <TextField {...params} />}
                        /> </>} />
            </LocalizationProvider>
            <Controller
                name='frequncy'
                control={control}
                render = {({field}) => <>
                        <FormControl {...field}>
                            <FormLabel id="demo-radio-buttons-group-label">Frequncy</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="once" control={<Radio />} label="Once" />
                                <FormControlLabel value="evrey" control={<Radio />} label="Evrey week" />
                            </RadioGroup>
                        </FormControl> </> } /> 
           
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