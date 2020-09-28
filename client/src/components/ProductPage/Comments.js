import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, Divider, ListItemText, Typography, Paper} from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        maxHeight: 200, 
        overflow: 'auto',
        backgroundColor: 'rgba(66, 66, 66, 0.36)',
        width: 450,
        boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        
      '&:hover':{
       boxShadow: '15px 20px 30px rgba(0, 0, 0, 0.2)',
     },
     //barra de scroll
     '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px black'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
      },  
    },
  }));


const Comments = ({data}) => {
    

    const classes = useStyles()
    return(
        <Paper className={classes.root}>
            <List >
                {  
                    data.map((c)=>{
                        return(
                        <>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                            style={{color: '#f6f6f6'}}
                            primary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    style={{color: '#adadad'}}
                                >
                                    {c.user ? c.user.infoUser.name +': ' : 'Usuario: '}
                                </Typography>
                                 {c.commentary}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </>
                        )
                    })
                }
        </List>
    </Paper>
    ) 
}

export default Comments
