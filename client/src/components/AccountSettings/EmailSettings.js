import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { modifyMyUser, logout } from '../../store/actions';

function EmailSettings({openEmail, handleClose, modifyUser, history, userEmail}) {
  const [state, setState] = useState('');
  const [validate, setValidate] = useState(false)
  function handleSubmit(e) {
    e.preventDefault();
    handleClose();
    logout();
    history.push('/login')
    modifyUser(state);
    setState('');
  }

  function validateEmail(valueIn) {
    if(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(valueIn) || valueIn === userEmail) {
      setValidate(true)
    } else {
      setValidate(false)
    }
    setState(valueIn)
  }

  return (
    <form onSubmit={e => {e.preventDefault(); logout()}}>
      <Dialog open={openEmail} onClose={handleClose}>
        <DialogTitle>Email settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your email address, please enter your new email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            helperText={validate ? 'Enter a valid email' : ' '}
            error={validate}
            label="New Email Address"
            type="email"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state}
            onChange={e => validateEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary" disabled={validate}>
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
    modifyUser: (email) => dispatch(modifyMyUser({email}, 'Email successfully changed!', 'Error changing email, please try again.')),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailSettings))
