import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form'
import { SessionContextStore } from '../../context/SessionContext';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FlexView from 'react-flexview/lib';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './Signup.css'
import EventBus from '../../eventbus/EventBus';



const theme = createTheme();

const SignupForm = () => {
    const sessionContext = React.useContext(SessionContextStore)
    const [token, setToken] = React.useState('')
    const { control, handleSubmit } = useForm({
        defaultValues: {
          email: '',
          password: '',
          name: '',
          phone: '',
        }
      });
    const onSubmit = data => signup(data.email, data.password, data.firstname + " " + data.lastname, data.phone)

    const signup = (email,password,name,phone) => {
      console.log(typeof(password))
      if(password && password.length < 6) {
        EventBus.publish("SHOW_ALERT,error,password should contain at least 6 charaters")
      }
      else {
        sessionContext.signup(email, password)
        sessionContext.createUser(email, name, phone)
      }
    }

    return <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
    <Avatar sx={{ m: 1 , bgcolor:'primary.main'}}>
      <PermContactCalendarIcon color='white' />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign Up
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
        name="email"
        control={control}
        render={({ field }) => <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...field}
                            /> } />
    <FlexView >
      <Controller
          name="firstname"
          control={control}
          render={({ field }) => <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="firstname"
                                  label="First Name"
                                  name="firstname"
                                  autoComplete="firstname"
                                  autoFocus
                                  {...field}
                              /> } />
      <Controller
          name="lastname"
          control={control}
          render={({ field }) => <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="lastname"
                                  label="Last Name"
                                  name="lastname"
                                  autoComplete="lastname"
                                  autoFocus
                                  {...field}
                              /> } />
    </FlexView>
    <Controller
          name="phone"
          control={control}
          render={({ field }) => <PhoneInput
                                  className='phonePicker'
                                  placeholder="Enter phone number"
                                  country={'us'}
                                  required
                                  {...field}
                              /> } />
    <Controller 
        name='password'
        control={control}
        render = {({field}) => <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...field}
                            /> }/>
      <Button
        onClick={signup}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      </form>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/login" variant="body2">
            {"Sign in"}
          </Link>
        </Grid>
      </Grid>
    </Box>
}

export const Signup = () => {

  const isMobile = !useMediaQuery('(min-width:600px)');


  return isMobile ? <div>
      <img 
        src={"https://firebasestorage.googleapis.com/v0/b/ezlinks-1b7b7.appspot.com/o/mick-haupt-m0iXio5FF7M-unsplash.jpg?alt=media&token=3ff6f0d4-4c38-49f9-b77d-81311550ae1d"}
        height={190}
        width={'100%'} 
        />
        
      <Paper elevation={0} style={{marginTop: '-6vh', borderRadius: 50, position: 'absolute'}}>
        <SignupForm />
      </Paper>

    </div> : (<>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(https://firebasestorage.googleapis.com/v0/b/ezlinks-1b7b7.appspot.com/o/mick-haupt-m0iXio5FF7M-unsplash.jpg?alt=media&token=3ff6f0d4-4c38-49f9-b77d-81311550ae1d)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <SignupForm />
        </Grid>
      </Grid>
    
    </>
  );
}