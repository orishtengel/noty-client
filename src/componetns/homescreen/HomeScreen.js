import { Container, Grid } from '@mui/material'
import React from 'react'
import { CardWebsite } from '../card_website/CardWebsite'
import { v4 as uuidv4 } from 'uuid';
import './HomeScreen.css'
import { ApplicationsContextStore } from '../../context/ApplicationsContext';
import { SessionContextStore } from '../../context/SessionContext';
import '../../config_firebase/ConfigFirebase'
import firebase from 'firebase/app'
import 'firebase/messaging'
import ApplicationsApi from '../../api/ApplicationsApi';

export const HomeScreen = () => { 
    const sessionContext = React.useContext(SessionContextStore)
    const applcationContext = React.useContext(ApplicationsContextStore)

    React.useEffect(() => {
        applcationContext.loadApplications()
    },[])

    React.useEffect(() => {
        const messaging = firebase.messaging()
        messaging.getToken().then(async pushNotificationToken => {
            await ApplicationsApi.updateUserPushNotificationToken(pushNotificationToken)
        })
    }, [])

    return(<>
    <Container>
        <Grid container spacing={3}>
            {applcationContext.applications ? Object.keys(applcationContext.applications).map((app,i) => {
                return  <Grid key={i} item xs={12} md={4}>
                <CardWebsite idWebsite = {app} appdata = {applcationContext.applications[app]}/>
             </Grid> 
            }) : <></>}
        </Grid>
        <br />
    </Container>
    </>)
}