import { Dialog } from '@material-ui/core'
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import EventBus from '../../eventbus/EventBus';
import { Alert, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import FlexView from 'react-flexview/lib';


export const Alerts = () => {

    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('')
    const handleClose = () => setOpen(false)

    React.useEffect(() => {

        const subscription1 = EventBus.subscribe("SHOW_ALERT", (text) => {
            setOpen(true)
            setText(text)
        })

        const subscription2 = EventBus.subscribe("HIDE_LOADING", () => {
            setOpen(false)
            setText('')
        })

        return function cleanup () {
            subscription1.unsubscribe()
            subscription2.unsubscribe()
        }

    }, [])

    return (<>
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' severity={text ? text.split(',')[0] : 'info'} sx={{ width: '100%' }}>
            {text.split(',')[1]}
        </Alert>
    </Snackbar>
      </>
    )
}