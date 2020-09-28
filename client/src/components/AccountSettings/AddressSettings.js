import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { modifyMyUser } from '../../store/actions';

function AddressSettings({openAddress, handleClose, modifyUser}) {
  const [state, setState] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleClose();
    modifyUser(state);
    setState('')
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Dialog open={openAddress} onClose={handleClose}>
        <DialogTitle>Address settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your address, please enter your new address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Address"
            type="text"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state}
            onChange={e => setState(e.target.value)}
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
    modifyUser: (address) => dispatch(modifyMyUser({address}, 'Address successfully changed!', 'Error changing address, please try again.'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSettings)
