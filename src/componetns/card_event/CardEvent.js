import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Divider, Grid } from '@mui/material';
import FlexView from 'react-flexview/lib';
import { EraseDialog } from '../erase_dialog/EraseDialog';
import { SubscribeContextStore } from '../../context/SubscribeContext';
import { getDayMonth, getDayShort, getLtime } from '../../services/dateUtils';

export const CardEvent = ({idSubscribe, dataCard, deleteSubscribe}) => {

  const theme = useTheme();
  const [dialogData, setDialogData] = React.useState({open: false})
  const openDialog = () => {
    setDialogData({open: true, data: dialogData})
  }

  const OnEraseSelect = (flag) => {
      if (flag) {
          deleteSubscribe(dataCard.idWebsite, idSubscribe)
      }
      setDialogData({open: false, data: dialogData})
  }

  return (
    <Card>
        <Grid container style={{padding:'2%'}}>
            <Grid item xs = {2} md = {2}>
                <FlexView column style={{height:'100%'}} vAlignContent='center' hAlignContent='center'>
                    <Typography style={{fontWeight:'bold'}} variant='h7'>{dataCard ? getDayShort(dataCard.date) : "" }</Typography>
                    <Typography color='primary' variant='h4'>{dataCard ? getDayMonth(dataCard.date) : ""}</Typography>
                </FlexView>
            </Grid>
            <Grid item xs={8} md={8}>
                <Container>
                <Typography variant="h6">
                    Los Roblos Green
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {dataCard ? getLtime(dataCard.startTime) : ""} - { dataCard ? getLtime(dataCard.endTime) : ""}
                </Typography>
                </Container>
            </Grid>
            <Grid item xs={2} md={1}>
                <FlexView vAlignContent='center' hAlignContent='center' style={{height:'100%'}}>
                    <IconButton onClick={openDialog} color='primary' aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </FlexView>
            </Grid>
        </Grid> 
        <EraseDialog data = {dialogData} OnEraseSelect = {OnEraseSelect} />
    </Card>
  );
}