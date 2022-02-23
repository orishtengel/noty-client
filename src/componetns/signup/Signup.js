import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from './golf-g17efc2cb0_640.jpg'
import { useForm, Controller } from 'react-hook-form'
import { SessionContextStore } from '../../context/SessionContext';
import GoogleButton from 'react-google-button'
import firebase from 'firebase/app'
import 'firebase/auth'

const theme = createTheme();

export const Signup = () => {

    const sessionContext = React.useContext(SessionContextStore)
    const [token, setToken] = React.useState('')
    const { control, handleSubmit } = useForm({
        defaultValues: {
          email: '',
          password: ''
        }
      });
    const onSubmit = data => signup(data.email,data.password)

    const signup = async (email,password) => {
        let resp = await sessionContext.signup(email,password)
    }

    const signupGoogle = () => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userCred) => {
        setToken(userCred.credential.tokenId)
      })
    }

  return (<>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <GoogleButton onClick={signupGoogle} />
              </form>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}