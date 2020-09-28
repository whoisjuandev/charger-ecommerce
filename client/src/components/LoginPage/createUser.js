import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import {Button, Snackbar} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {createUser} from '../../store/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Alert} from '@material-ui/lab'

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
    padding: 40,
    paddingTop: 5,
    borderRadius: 20,
    border: '2px solid #fafafa',
    color: '#fafafa',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    border: '2px solid #fafafa',
    color: '#fafafa',
    '&:hover': {
      backgroundColor: '#fafafa',
      color: '#1C1C1C',
      transition: '0.7s',
    },
  },
}))

const CssTextField = withStyles({
  root: {
    color: 'red',
    '& label': {
      color: 'rgba(255, 255, 255, 0.40)',
    },
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

function CreateUser({createUser, history}) {
  const classes = useStyles()

  const [user, setUser] = React.useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    address: '',
    otherPass: '',
  })
  const [open, setOpen] = React.useState(false)
  const [invalid, setInvalid] = React.useState(true)

  function validateInfo({email, name, lastName, address, password, otherPass}) {
    if (
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email) ||
      !name ||
      !lastName ||
      !address ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) ||
      otherPass !== password
    ) {
      setInvalid(true)
    } else {
      setInvalid(false)
    }
    setUser({email, name, lastName, address, password, otherPass})
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{color: '#fafafa'}}>
          SIGN UP
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault()
            createUser(
              user.email,
              user.password,
              user.name,
              user.lastName,
              user.address
            )
            setUser({
              email: '',
              password: '',
              name: '',
              lastName: '',
              address: '',
              otherPass: '',
            })
            // history.push('/login')
          }}
        >
          <CssTextField
            onChange={e => validateInfo({...user, email: e.target.value})}
            value={user.email}
            error={!invalid ? false : true}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
          />
          <CssTextField
            onChange={e => validateInfo({...user, name: e.target.value})}
            value={user.name}
            error={!invalid ? false : true}
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            id="name"
            autoComplete="off"
          />
          <CssTextField
            onChange={e => validateInfo({...user, lastName: e.target.value})}
            value={user.lastName}
            error={!invalid ? false : true}
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            autoComplete="off"
          />
          <CssTextField
            onChange={e => validateInfo({...user, address: e.target.value})}
            value={user.address}
            error={!invalid ? false : true}
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            autoComplete="off"
          />
          <CssTextField
            onChange={e => validateInfo({...user, password: e.target.value})}
            value={user.password}
            error={!invalid ? false : true}
            helperText="Password must contain at least 8 character length, one uppercase and one number."
            margin="none"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <CssTextField
            onChange={e => validateInfo({...user, otherPass: e.target.value})}
            value={user.otherPass}
            error={!invalid ? false : true}
            helperText="Repeat password."
            margin="none"
            required
            fullWidth
            name="otherPass"
            label="Repeat password"
            type="password"
            id="otherPass"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            className={classes.submit}
            disabled={!invalid ? false : true}
            onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="/login"
                style={{textDecoration: 'none', color: '#fafafa'}}
              >
                I have an acount!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          ¡Account successfully created!
        </Alert>
      </Snackbar>
    </Container>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (email, password, name, lastName, address) =>
      dispatch(createUser(email, password, name, lastName, address)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CreateUser))
