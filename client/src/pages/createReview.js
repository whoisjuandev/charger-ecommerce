import React ,{ useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { reviews, addReviews, getUser  } from "../store/actions";
import { Button, Divider } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  card: {
      width: 500, 
      backgroundColor: 'rgba(66, 66, 66, 0.36)',
      padding: 20,
      borderRadius: 20,
      alignItems: 'center',
      display: 'flex',
      flexDirection: "column",
      boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.2)',
      '&:hover':{
       backgroundColor: 'rgba(66, 66, 66, 0.7)',
       boxShadow: '5px 20px 30px rgba(0, 0, 0, 0.2)'
     }
  },  
}));
function CreateReview({addReviews}) {
  const [reviewToAdd, getReviewToAdd] = React.useState({
    userId: 1,
    productId: 0,
    commentary: "",
    rating: 0
  });
  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={8}>
	  <form  onSubmit={() => {
	    addReviews(
	    reviewToAdd.userId,
	    reviewToAdd.productId,
	    reviewToAdd.commentary, 
	    reviewToAdd.rating
	    )} } autoComplete="off" className={classes.card}>
	    <TextField
                label="ProductId"
                onChange={(evnt) => getReviewToAdd({...reviewToAdd, productId: evnt.target.value})}
                value={reviewToAdd.productId}
                placeholder="number"
                fullWidth
                margin="normal"
                color='secondary'	
	        type="number"
              />
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
	    <Button type='submit' style={{border: '0.05px solid grey'  }}>submit</Button>
	  </form>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
function mapStateToProps(state) {
  return {
    reviews: state.reviews,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addReviews: (userId, productId, commentary, rating) => dispatch(addReviews(userId, productId, commentary, rating)),
    getUser: () => dispatch(getUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
