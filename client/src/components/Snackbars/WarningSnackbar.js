import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import {clearSnackbar} from '../../store/actions'
import {Alert} from '@material-ui/lab'

function SuccessSnackbar({warningSnackbarOpen, warningSnackbarMessage}) {
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
                open={warningSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                aria-describedby="client-snackbar"
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                >
                    {warningSnackbarMessage}
                </Alert>
            </Snackbar>
    )
}

function mapStateToProps(state) {
  return {
    warningSnackbarMessage: state.warningSnackbarMessage,
    warningSnackbarOpen: state.warningSnackbarOpen
  }
}

export default connect(mapStateToProps)(SuccessSnackbar)