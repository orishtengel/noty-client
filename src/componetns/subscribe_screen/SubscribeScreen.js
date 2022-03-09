import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { CardWebsite } from '../card_website/CardWebsite'
import { v4 as uuidv4 } from 'uuid';
import { ApplicationsContextStore } from '../../context/ApplicationsContext';
import SessionContext, { SessionContextStore } from '../../context/SessionContext';
import { CardEvent } from '../card_event/CardEvent';
import { SubscribeContextStore } from '../../context/SubscribeContext';
import { SubscribesContextStore } from '../../context/SubscribesContext';
import EventBus from '../../eventbus/EventBus';


export const SubscribeScreen = () => { 
    const subscribesContext = React.useContext(SubscribesContextStore)
    const applcationContext = React.useContext(ApplicationsContextStore)
    const [localState, setLocalSubscribe] = React.useState('')

    React.useEffect(() => {
        Object.keys(applcationContext.applications).map(async app => {
            await subscribesContext.getSubscribesById(app)
        })
    },[])

    React.useEffect(() => {
        Object.keys(applcationContext.applications).map(async app => {
            await subscribesContext.getSubscribesById(app)
        })
    },[localState])

    const deleteSubscribe = async (idWebsite, idSubscribe) => {
        let resp = await subscribesContext.deleteSubscribe(idWebsite, idSubscribe)
        if (resp) {
            setLocalSubscribe(uuidv4())
            EventBus.publish('SHOW_ALERT','success, You are now unsubscribed')
        }
        else {
            EventBus.publish('SHOW_ALERT','erroe, Error in unsubscribing')
        }
    }

    return(<>
    <Container className='margin-top-sx'>
        <Grid container spacing={3}>
            {subscribesContext.subscribes ? Object.keys(subscribesContext.subscribes).map((subscribe,i) => {
                return <Grid key={i} item xs={12} md={6}> 
                    <CardEvent idSubscribe={subscribe} dataCard = {subscribesContext.subscribes[subscribe]} deleteSubscribe={deleteSubscribe}/>
                </Grid>
            }) : <><Container>
                    <Card style = {{marginTop:'10%'}}>
                        <CardContent>
                            <Typography variant='h6'>To see your subscribes you must subscribe first </Typography>
                        </CardContent>
                    </Card>
                </Container></>}
        </Grid>
    </Container>
    </>)
}