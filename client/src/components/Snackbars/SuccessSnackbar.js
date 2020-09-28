import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { clearSnackbar } from "../../store/actions";
import { Alert } from "@material-ui/lab";

function SuccessSnackbar({ successSnackbarMessage, successSnackbarOpen }) {
  const dispatch = useDispatch();

  // const {successSnackbarMessage, successSnackbarOpen} = useSelector(
  //     state => state
  // )

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={successSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
    >
      <Alert onClose={handleClose} severity="success" variant="filled">
        {successSnackbarMessage}
      </Alert>
    </Snackbar>
  );
}

function mapStateToProps(state) {
  return {
    successSnackbarMessage: state.successSnackbarMessage,
    successSnackbarOpen: state.successSnackbarOpen,
  };
}

export default connect(mapStateToProps)(SuccessSnackbar);
