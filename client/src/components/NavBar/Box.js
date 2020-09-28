import React from 'react';
import {makeStyles, Drawer, Divider} from '@material-ui/core'
import List from './List'


const styles = makeStyles(theme=> ({
  drawer:{
    width: 240,
    flexShrink: 0,
   
  },
  drawerPaper:{
    width: 240,
    background: 'rgba(66, 66, 66, 0.36)',
  },
  toolbar: theme.mixins.toolbar,
}))
export default function Box(props) {

    const classes = styles();

    return (    
          <Drawer 
              className={classes.drawer} 
              classes={{ paper: classes.drawerPaper}}
              anchor='left'
              variant={props.variant}
              open={props.open}
              onClose={props.onClose ? props.onClose : null} 
          >
          <div className={classes.toolbar}></div>
          <Divider/>
          <List/>
          </Drawer> 

    );
}