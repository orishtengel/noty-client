import React from 'react'
import { AppBar, Avatar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import FlexView from 'react-flexview/lib'
import './AppBar.css'
import { SessionContextStore } from '../../context/SessionContext';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import { getName } from '../../services/dateUtils'
import SessionService from '../../services/SessionService'
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';



export const AppBarNoty = () => {
    const sessionContext = React.useContext(SessionContextStore)
    const history = useHistory()

    const [menuOpen,setMenuOpen] = React.useState(false)

    const openMenu = () => {
        setMenuOpen(true)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    } 

    const logout = () => {
      sessionContext.logout()
    }

    const goToHome = () => {
      history.push('/')
      setMenuOpen(false)
    }

    const goToSubscribe = () => {
      history.push('/MySubscribe')
      setMenuOpen(false)
    }

    return (<>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar className='gradient_appbar' position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openMenu}
          >
            <MenuIcon style={{color:'white'}} />
          </IconButton>
          <Typography style={{color:'white'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Avatar sx={{bgcolor: '#0b5b3c'}} size={90} color={'#219F94'} style={{borderWidth: "2px", color: 'white', border:'solid'}} >{getName(sessionContext.name)}</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer PaperProps={{style: {width: '300px'}}} anchor={'left'} open={menuOpen} onClose={closeMenu}>
            {SessionService.isLoggedIn() && <>
                <br/>
                <br/>
                <FlexView column hAlignContent='center'>
                     <Avatar sx={{bgcolor:'#0b5b3c'}} size={90} color={'#ff9234'} style={{borderWidth: "2px", color: 'white', border:'solid'}} />
                     <br/>
                    <div style={{color: 'white', fontWeight: 'bold', fontSize: '1.3em', textTransform: 'capitalize'}}>{sessionContext.name}</div>
                </FlexView>
                <br/>
                <Divider  className="white-divdier" />
                <br/>
            </>}
            <List>
            {SessionService.isLoggedIn() && 
                <ListItem button onClick={goToHome}>
                    <ListItemIcon><HomeIcon color="secondary" /></ListItemIcon>
                    <ListItemText style={{color: 'white'}} primary={"Home"} />
                </ListItem>}
            {SessionService.isLoggedIn() && 
                <ListItem button onClick={goToSubscribe}>
                    <ListItemIcon><InventoryIcon color="secondary" /></ListItemIcon>
                    <ListItemText style={{color: 'white'}} primary={"My Subscriptions"} />
                </ListItem>}
                {SessionService.isLoggedIn() && 
                <ListItem button onClick={logout} >
                    <ListItemIcon><LogoutIcon color="secondary" /></ListItemIcon>
                    <ListItemText style={{color: 'white'}} primary={"Logout"} />
                </ListItem>}
            </List>
            </Drawer>
         

    </>)
}

