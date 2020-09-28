import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { modifyMyUser } from '../../store/actions';
import { connect } from 'react-redux';

function FullnameSettings({openName, handleClose, handleFullnameClose, modifyUser}) {
  const [state, setState] = useState({name: '', lastName: ''});

  function handleSubmit(e) {
    e.preventDefault();
    console.log(state);
    handleClose();
    modifyUser(state.name, state.lastName);
    setState({name: '', lastName: ''})
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Dialog open={openName} onClose={handleClose}>
        <DialogTitle>Fullname settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your fullname, please enter your new name and last name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.name}
            onChange={e => setState({...state, name: e.target.value})}
          />
          <TextField
            margin="dense"
            id="name"
            label="Last name"
            type="text"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.lastName}
            onChange={e => setState({...state, lastName: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
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
    modifyUser: (name, lastName) => dispatch(modifyMyUser({name, lastName}, 'Name successfully changed!', 'Error changing your name, please try again.'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullnameSettings)
