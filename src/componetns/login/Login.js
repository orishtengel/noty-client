import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MailIcon from '@mui/icons-material/Mail';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './Login.css'
import { SessionContextStore } from '../../context/SessionContext';
import { Container, InputAdornment, useMediaQuery } from '@mui/material';
import FlexView from 'react-flexview/lib';


const LoginForm = () => {
  const sessionContext = React.useContext(SessionContextStore)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sessionContext.login(data.get('email'), data.get('password'))
  };

  return <Box 
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item >
                  <Link href="/signup" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
}

export const Login = () => {
  const isMobile = !useMediaQuery('(min-width:600px)');

  return isMobile ? <div>
    <img 
      src={"https://firebasestorage.googleapis.com/v0/b/ezlinks-1b7b7.appspot.com/o/overhead%20view%20golf%20course.svg?alt=media&token=76a023a2-2527-4afb-8df0-77e71fff47db"}
      height={240}
      width={'100%'} 
      />
      
    <Paper elevation={0} style={{marginTop: '-6vh', borderRadius: 50, position: 'absolute'}}>
      <LoginForm />
    </Paper>

  </div> : (
    <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/ezlinks-1b7b7.appspot.com/o/courtney-cook-SsIIw_MET0E-unsplash.jpg?alt=media&token=a677d4a6-8ac8-45c6-9246-4da2c8b9caf6)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='box-xs'>
          <LoginForm />
        </Grid>
      </Grid>
  );
}