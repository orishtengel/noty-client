import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const EraseDialog = ({data, OnEraseSelect}) => {
    const erase = () => OnEraseSelect(true)

    const close = () => OnEraseSelect(undefined)

    return (
    <Dialog
        open={data.open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete?'}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={erase}>Yes</Button>
          <Button onClick={close} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

    )

}