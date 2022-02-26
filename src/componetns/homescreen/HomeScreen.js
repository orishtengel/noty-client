import { Button, Container, Grid } from '@mui/material'
import React from 'react'
import FlexView from 'react-flexview/lib'
import { CardWebsite } from '../card_website/CardWebsite'
import { SessionContextStore } from '../../context/SessionContext'

import image1 from './courtney-cook-SsIIw_MET0E-unsplash.jpg'
import image2 from './matt-aylward-Nmh-pEBRt2Y-unsplash.jpg'
import image3 from './mick-haupt-m0iXio5FF7M-unsplash.jpg'
import './HomeScreen.css'
import { CoursesContextStore } from '../../context/CoursesContext'

export const HomeScreen = () => {

    const sessionContext = React.useContext(SessionContextStore)
    const coursesContext = React.useContext(CoursesContextStore)

    const click = () => {
        console.log(coursesContext.loadCourses())
    }
    
    
    return(<>
    <Container className='margin-top-sx'>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <CardWebsite image={image1}/>
                <Button onClick={click}>
                    ds
                </Button>
             </Grid>
             <Grid item xs={12}  md={4}>
                <CardWebsite image={image2}/>
             </Grid>
             <Grid item xs={12} md={4}>
                <CardWebsite image={image3}/>
             </Grid>
        </Grid>
    </Container>
    </>)
}