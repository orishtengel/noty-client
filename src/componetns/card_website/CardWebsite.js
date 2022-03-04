import {Button, CardActions, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SubscribeDialog } from '../subscribe_dialog/SubscibeDialog';
import './CardWebsite.css'
import { SubscribeContextStore } from '../../context/SubscribeContext';
import FlexView from 'react-flexview/lib';


export const CardWebsite = ({email, appdata}) => {

    const [dialogData, setDialogData] = React.useState({open: false , data : {}})
    const subscribeContext = React.useContext(SubscribeContextStore)
    const keyWebsite = Object.keys(appdata)

    const openDialog = () => {
        setDialogData({open: true, data: dialogData})
    }
    const subscibeSelect = (data) => {
      if(data) {
        subscribeContext.addSubscribe(keyWebsite[0], data.email, data.date, data.startTime, 
          data.endTime, data.frequncy)
        setDialogData({open: false, data: dialogData})
      }
      else {
        setDialogData({open: false, data: dialogData})
      }
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
        <Grid container spacing={1}>
          <Grid item xs={8} md={8} >
              <FlexView column>
                <Typography gutterBottom variant="h5" component="div">
                  Course
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {appdata[keyWebsite].name}
                </Typography>
              </FlexView>
          </Grid>
          <Grid item xs={4} md={4}>
            <FlexView >
              <Button className='left initial top-lg' variant='outlined' onClick={openDialog} size="small">Subscribe</Button>
            </FlexView>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <SubscribeDialog dataWebsite={dialogData} OnSubscribeSelect={subscibeSelect}/>

    </>)
}