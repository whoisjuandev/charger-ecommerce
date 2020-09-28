import React ,{ useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { reviews, addReviews, getUser  } from "../../store/actions";
import { Button, Divider, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
    boxStyle: {
     width: 500, 
     backgroundColor: 'rgba(66, 66, 66, 0.36)',
     padding: 20,
     borderRadius: 20,
     alignItems: 'center',
     display: 'flex',
     flexDirection: "column",
     boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.2)',
     '&:hover':{
        backgroundColor: 'rgba(66, 66, 66, 0.8)',
        boxShadow: '5px 20px 30px rgba(0, 0, 0, 0.2)',
        transition: '0.4s'
      }
  },
}));
function CreateReview({ userId, productId ,addReviews}) {
  const [reviewToAdd, getReviewToAdd] = React.useState({
    userId: userId,
    productId: productId,
    commentary: "",
    rating: 0
  });

  const classes = useStyles()
  const message = 'Review successfully created!'

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box >
      <Grid
        container
        direction="colum"
        justify="center"
        alignItems="center"
      >
	  <form  className={classes.boxStyle} onSubmit={(event) => {
	    event.preventDefault();
	    addReviews(
	    reviewToAdd.userId,
	    reviewToAdd.productId,
	    reviewToAdd.commentary, 
	    reviewToAdd.rating,
      message
	    )} } autoComplete="off" >
	    <TextField
                label="Let us know your opinion."
                onChange={(evnt) => getReviewToAdd({...reviewToAdd, commentary : evnt.target.value})}
                value={reviewToAdd.commentary}
                placeholder="I love it."
                fullWidth
                margin="normal"
                color='secondary'
              />
      <Rating  style={{margin: 20}}
                onChange={(evnt) => getReviewToAdd({...reviewToAdd, rating: parseInt(evnt.target.value)})}
                value={reviewToAdd.rating}
              />
      <Divider/>
	    <br/> 
	    <Button type='submit' color='inherit' variant='outlined' size='medium'>submit</Button>
	  </form>
      </Grid>
      </Box>
    </ThemeProvider>
  );
}
function mapStateToProps(state) {
  return {
    reviews: state.reviews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addReviews: (userId, productId, commentary, rating, message) => dispatch(addReviews(userId, productId, commentary, rating, message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
