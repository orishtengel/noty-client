import { Container, Grid } from '@mui/material'
import React from 'react'
import { CardWebsite } from '../card_website/CardWebsite'
import { v4 as uuidv4 } from 'uuid';
import './HomeScreen.css'
import { ApplicationsContextStore } from '../../context/ApplicationsContext';
import { SessionContextStore } from '../../context/SessionContext';


export const HomeScreen = () => { 
    const sessionContext = React.useContext(SessionContextStore)
    const applcationContext = React.useContext(ApplicationsContextStore)

    React.useEffect(() => {
        applcationContext.loadApplications()
    },[])


    return(<>
    <Container className='margin-top-sx'>
        <Grid container spacing={3}>
            {applcationContext.applications.map((app,i) => {
                return  <Grid key={i} item xs={12} md={4}>
                <CardWebsite email = {sessionContext.email} appdata = {app}/>
             </Grid> 
            })}
        </Grid>
    </Container>
    </>)
}