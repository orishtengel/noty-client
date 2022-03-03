import {Button, CardActions, Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SubscribeDialog } from '../subscribe_dialog/SubscibeDialog';
import './CardWebsite.css'
import { SubscribeContextStore } from '../../context/SubscribeContext';


export const CardWebsite = ({email, appdata}) => {

    const [dialogData, setDialogData] = React.useState({open: false , data : {}})
    const subscribeContext = React.useContext(SubscribeContextStore)
    const keyWebsite = Object.keys(appdata)

    const openDialog = () => {
        setDialogData({open: true, data: dialogData})
    }
    const subscibeSelect = () => {
        subscribeContext.addSubscribe(keyWebsite[0], email, dialogData.data.date, dialogData.data.startTime, 
          dialogData.data.endTime, dialogData.data.frequncy)
        setDialogData({open: false, data: dialogData})
    }
    

    return(<>
     <Card >
      <CardMedia
        component="img"
        height="140"
        image={appdata[keyWebsite].picture}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Course
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {appdata[keyWebsite].name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className='left' variant='outlined' onClick={openDialog} size="small">Subscribe</Button>
      </CardActions>
    </Card>
    <SubscribeDialog dataWebsite={dialogData} OnSubscribeSelect={subscibeSelect}/>

    </>)
}