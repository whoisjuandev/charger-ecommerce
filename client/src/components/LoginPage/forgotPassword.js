import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { resetPassword } from '../../store/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
      border: '2px solid #fafafa'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
      padding: 30,
      borderRadius:  20,
      border: '2px solid #fafafa',
      color: '#fafafa'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      border: '2px solid #fafafa',
      color: '#fafafa',
      "&:hover":{
        backgroundColor: '#fafafa',
        color: '#1C1C1C',
        transition: '0.7s'
      }
    },
  }));

  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#fafafa',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fafafa',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#fafafa',
      },
    },
  })(TextField);


function Login({resetPassword}) {
    const classes = useStyles();

    const [state, setState] = useState({
      email: '',
      password: '',
      repassword: ''
    });
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color: '#f6f6f6'}}>
            RESET PASSWORD
          </Typography>
          <form onSubmit={e => {
            e.preventDefault();
            resetPassword(state.email, state.password, state.repassword);
            
          }} className={classes.form} noValidate>
          <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Account email"
              type="email"
              name="email"
              autoComplete="off"
              value={state.email}
              onChange={e => setState({...state, email: e.target.value})}
            />
          <CssTextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              type="password"
              name="password"
              autoComplete="off"
              value={state.password}
              onChange={e => setState({...state, password: e.target.value})}
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="repassword"
              label="Type Password Again"
              type="password"
              id="password"
              autoComplete="off"
              value={state.repassword}
              onChange={e => setState({...state, repassword: e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              className={classes.submit}
            >
              Reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/login' style={{textDecoration: 'none', color: '#fafafa'}}>
                  I already remembered my password!
                </Link>
              </Grid>
              
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return{
    resetPassword: (email, password, repassword) => dispatch(resetPassword(email, password, repassword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);