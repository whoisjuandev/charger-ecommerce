import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { makeStyles, CircularProgress, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { confirmOrder } from '../store/actions';

const useStyle = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    text: {
        marginTop: '3em',
        color: '#666'
    }
})

function OrderConfirmPage({confirmOrder, history}) {
    const { token } = useParams();

    const classes = useStyle();

    useEffect(() => {
        confirmOrder(token, history.push);
    }, []);

    return (
        <div className={classes.root}>
            <CircularProgress />
            <Typography className={classes.text} variant='h3'>Loading...</Typography>
        </div>
    )
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        confirmOrder: (token, redirectTo) => dispatch(confirmOrder(token, redirectTo, 'Order confirmed correctly.', 'Invalid or lready confirmed order.'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderConfirmPage));