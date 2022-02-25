import {Button, CardActions, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { SubscribeDialog } from '../subscribe_dialog/SubscibeDialog';
import './CardWebsite.css'
import {ReactComponent as GolfSvg} from '../../assets/undraw_golf_neir.svg'


export const CardWebsite = ({image}) => {

    const [dialogData, setDialogData] = React.useState({open: false, date: new Date()})

    const openDialog = () => {
        setDialogData({open: true,date: new Date()})
    }
    const subscibeSelect = async (date) => {
        setDialogData({open: false, date: new Date()})
    }

    return(<>
     <Card >
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Course
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Los Robles Greens Golf Course
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={openDialog} size="small">Subscribe</Button>
      </CardActions>
    </Card>
    <SubscribeDialog data={dialogData} OnSubscribeSelect={subscibeSelect}/>

    </>)
}