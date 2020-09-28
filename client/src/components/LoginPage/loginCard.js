import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import {Link, Redirect, withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions'


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'rgba(255, 255, 255, 0.24)',
        border: '2px solid #fafafa',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        backgroundColor: 'rgba(255, 255, 255, 0.24)',
        padding: 30,
        borderRadius: 20,
        border: '2px solid #fafafa',
        color: '#fafafa',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        border: '2px solid #fafafa',
        color: '#fafafa',
        '&:hover': {
            backgroundColor: '#fafafa',
            color: '#1C1C1C',
            transition: '0.7s',
        },
    },
    google: {
        textAlign: 'center',
        width: '100%',
        border: '2px solid #fafafa',
        color: '#fafafa',
        textDecoration: 'none',
        padding: 10,
        borderRadius: 5,
        '&:hover': {
            backgroundColor: '#fafafa',
            color: '#1C1C1C',
            transition: '0.7s',
        },
    }
}))

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
})(TextField)

function Login({onLogin, logged, history}) {
    const classes = useStyles()

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });
    
    const errorMessage = 'Email or password invalid, please try again!'

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();
        onLogin(values.email, values.password, errorMessage);
    }

    if(logged) {
        return <Redirect path='/' />
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{color: '#fafafa'}}
                >
                    LOGIN
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        autoComplete="off"
                        value={values.email}
                        onChange={handleChange('email')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle style={{color:'#fafafa'}}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        name="password"
                        placeholder="Password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                style={{color:'#fafafa'}}
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid style={{marginBottom: 15, width: '100%', display: 'flex', justifyContent: 'center',}} >
                        <a href='http://localhost:3001/google' className={classes.google}>Sign up with Google  </a>
                    </Grid>

                    <Grid container>
                        <Grid item xs>
                            <Link
                                to="/forgotPassword"
                                style={{
                                    textDecoration: 'none',
                                    color: '#fafafa',
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="/signUp"
                                style={{
                                    textDecoration: 'none',
                                    color: '#fafafa',
                                }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        logged: state.logged
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (email, password, errorMessage) => dispatch(loginUser(email, password, errorMessage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));