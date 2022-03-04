import { Dialog } from '@material-ui/core'
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import EventBus from '../../eventbus/EventBus';


export const LoadingScreen = () => {

    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {

        const subscription1 = EventBus.subscribe("SHOW_LOADING", () => setOpen(true))
        const subscription2 = EventBus.subscribe("HIDE_LOADING", () => setOpen(false))

        return function cleanup () {
            subscription1.unsubscribe()
            subscription2.unsubscribe()
        }

    }, [])

    return (
        <Dialog style={{zIndex: 2000}} open={open}
            PaperProps={{style: {
                overflow: 'hidden',
                backgroundColor: "transparent",
                boxShadow: 'none'
            }}}>
            <CircularProgress />
        </Dialog>
    )
}