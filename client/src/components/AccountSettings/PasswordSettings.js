import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { modifyMyUser, logout } from '../../store/actions'

function PasswordSettings({openPassword, handleClose, handlePasswordClose, modifyUser, logout}) {
  const [state, setState] = useState({password: '', repassword: '', apassword: ''});
  const [validate, setValidate] = useState({
    status: false,
    title: 'Enter a valid password'
  })

  function validateInfo({password, repassword}) {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) || password !== repassword) {
      setValidate({...validate, status: true})
    } else {
      setValidate({...validate, status: false})
    }
    setState({...state, password: password, repassword: repassword})
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleClose();
    modifyUser(state.apassword, state.password, state.repassword);
    setState({password: '', repassword: '', apassword: ''})
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Dialog open={openPassword} onClose={handleClose}>
        <DialogTitle>Password settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password, please enter your actual password here,
            then the new one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Actual Password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.apassword}
            onChange={e => setState({...state, apassword: e.target.value})}
          />
          <TextField
            margin="dense"
            error={validate.status}
            helperText={validate.status ? validate.title : ''}
            id="name"
            label="New Password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.password}
            onChange={e => validateInfo({...state, password: e.target.value})}
          />
          <TextField
            margin="dense"
            error={validate.status}
            helperText={validate.status ? validate.title : ''}
            id="name"
            label="Repeat password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.repassword}
            onChange={e => validateInfo({...state, repassword: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="secondary" disabled={validate.status}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    modifyUser: (apassword, password, repassword) => dispatch(modifyMyUser({apassword, password, repassword}, 'Password successfuly changed!', 'Error changing password, please try again.')),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSettings);
