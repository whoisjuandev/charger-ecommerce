import React from 'react'
import {
    Box,
    Card,
    CardContent,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Style from './orderCheckoutPage.module.css'

const useStyle = makeStyles({
    root: {
        // width: '100vw',
        // height: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#e0e0e0',
    },
    card: {
        maxWidth: '480px',
        borderRadius: '8px',
        backgroundColor: '#fafafa'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '2em',
        textAlign: 'center'
    },
    icon: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: '2em',
        color: '#f50057',
    },
    infoText: {
        marginRight: '32px',
        marginLeft: '32px',
        color: '#212121'
    },
    titleText: {
        color: '#212121'
    }
})

export default () => {
    const classes = useStyle()
    return (
        <Box className={Style.root}>
            <Paper className={classes.card} elevation={4}>
                <CardContent className={classes.content}>
                    <FavoriteBorderIcon className={classes.icon} />
                    <Typography variant="h2" className={classes.titleText}>THANK YOU!</Typography>
                    <Typography variant="h6" className={classes.infoText}>
                        We have sent you an email. Open it to confirm the
                        purchase!
                    </Typography>
                </CardContent>
            </Paper>
        </Box>
    )
}
