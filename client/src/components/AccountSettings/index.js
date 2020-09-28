import { Divider, Grid, makeStyles, Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React, { Component, useState } from 'react'
import AddressSettings from './AddressSettings';
import EmailSettings from './EmailSettings';
import FullnameSettings from './FullnameSettings';
import PasswordSettings from './PasswordSettings';

const useStyles = makeStyles({
  root: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    padding: '4px',
    marginTop: '8px',
  },
  textFields : {
    cursor: 'pointer',
    backgroundColor: '#eeeeee',
    marginTop: 4,
    marginBottom: 4,
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  test: {
    // border: '1px solid blue',
    padding: '16px',
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    color: '#fafafa'
  }
})

export const AccountSettings = (props) => {
  const classes = useStyles();
  const { user } = props
  
  React.useEffect(() => {
    if (user) console.log(user)
  }, [user])

  const [openEmail, setOpenEmail] = useState(false)
  const [openName, setOpenName] = useState(false)
  const [openAddress, setOpenAddress] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)

  const handleOpenEmail = () => {
    setOpenEmail(true)
  }

  const handleOpenName = () => {
    setOpenName(true)
  }

  const handleOpenAddress = () => {
    setOpenAddress(true)
  }

  const handleOpenPassword = () => {
    setOpenPassword(true)
  }

  const handleClose = () => {
    setOpenEmail(false);
    setOpenName(false);
    setOpenAddress(false);
    setOpenPassword(false);
  }

  const handleEmailClose = () => {
    setOpenEmail(false);
  }

  const handleFullnameClose = () => {
    setOpenName(false);
  }

  const handleAddressClose = () => {
    setOpenAddress(false);
  }

  const handlePasswordClose = () => {
    setOpenPassword(false);
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.title}>Account Settings</Typography>
      <Divider />
      <Grid container className={classes.container}>
        <Grid item container xs={12} direction='column'>
          <Typography onClick={handleOpenEmail} className={classes.textFields}> {'Email'} </Typography>
          <Typography onClick={handleOpenName} className={classes.textFields}> {'Fullname'} </Typography>
          <Typography onClick={handleOpenAddress} className={classes.textFields}> {'Address'} </Typography>
          <Typography onClick={handleOpenPassword} className={classes.textFields}> {'Password'} </Typography>
        </Grid>
      </Grid>

      {/* DIALOG EMAIL */}
      <EmailSettings openEmail={openEmail} handleEmailClose={handleEmailClose} handleClose={handleClose} userEmail={user.email}/>

      {/* DIALOG NAME */}
      <FullnameSettings openName={openName} handleFullnameClose={handleFullnameClose} handleClose={handleClose} />

      {/* DIALOG ADDRESS */}
      <AddressSettings openAddress={openAddress} handleAddressClose={handleAddressClose} handleClose={handleClose} />

      {/* DIALOG PASSWORD */}
      <PasswordSettings openPassword={openPassword} handlePasswordClose={handlePasswordClose} handleClose={handleClose} />
    </div>
  )
}