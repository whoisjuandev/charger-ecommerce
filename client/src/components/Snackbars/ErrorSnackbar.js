import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import {clearSnackbar} from '../../store/actions'
import {Alert} from '@material-ui/lab'

function SuccessSnackbar({errorSnackbarMessage, errorSnackbarOpen}) {
    const dispatch = useDispatch()

    // const {successSnackbarMessage, successSnackbarOpen} = useSelector(
    //     state => state
    // )

    function handleClose() {
        dispatch(clearSnackbar())
    }

    return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={errorSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                aria-describedby="client-snackbar"
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                >
                    {errorSnackbarMessage}
                </Alert>
            </Snackbar>
    )
}

function mapStateToProps(state) {
  return {
    errorSnackbarMessage: state.errorSnackbarMessage,
    errorSnackbarOpen: state.errorSnackbarOpen
  }
}

export default connect(mapStateToProps)(SuccessSnackbar)