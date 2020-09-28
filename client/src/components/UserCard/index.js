import React from 'react';
import { Avatar, Typography, makeStyles, Paper, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
const useStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        width: '100%',
        height: 280,
        backgroundColor: 'rgba(66, 66, 66, 0.36)',
        boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        fontSize: 50,
        border: '2px solid #fafafa',
        '&:hover':{
        boxShadow: '15px 20px 30px rgba(0, 0, 0, 0.2)',
        transition: '0.7s',
        },
    },
    avatar: {
        border: '2px solid #fafafa',
        position: 'center',
        marginBottom: 10
    },
    title: {
        color: '#f6f6f6',
        marginTop: '10px',
        alignItems: 'center',
    },
    name: {
        color: '#f6f6f6',
        marginTop: '20px',
        marginBottom: 10,
        alignItems: 'start',
    },
    info: {
        color: '#f6f6f6',
        marginBottom: 10,
        alignItems: 'start', 
    },
    up:{
        display: 'flex',
        justifyContent: 'center'
    }
})

export default function UserCard({name, email, address}) {
    const classes = useStyle();

    return (
        <Paper className={classes.root} >
            <div className={classes.up} >
            <Avatar className={classes.avatar} >
                <AccountCircle style={{color:'#fafafa'}}/>  
            </Avatar>
            </div>
            <Typography className={classes.title} >Profile</Typography>
            <Divider/>
            <Typography className={classes.name}>Name: {name}</Typography>
            <Typography className={classes.info}>Email: {email}</Typography>
            {
                !address ? null : <Typography className={classes.info}>Address: {address}</Typography>       
            }
        </Paper>
    )
}