import React from 'react';
import SearchBar from '../SearchBar/index';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getSearch } from '../../store/actions';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'white',
    },
    appBar: {
        background: 'rgba(66, 66, 66, 0.36)',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
    appBarNoTransparent: {
        background: 'rgb(66, 66, 66)',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
    loginButton: {
        textDecoration: 'none',
    },
    charger: {
        fontFamily: 'Roboto',
        fontWeight: 600,
        "&:hover":{
            color: '#1C1C1C',
            transition: '0.3s'
        }
    },

}))

const NavBar = props => {
    const classes = useStyles()
    return (
        <div >
            <AppBar position="fixed" className={props.noTransparent?classes.appBarNoTransparent:classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => {props.getCategories(); props.onOpen()}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                            <Button className={classes.title}>
                        {!(props.logged) && <Link to="/login" style={{textDecoration:'none', color:'white'}}> LOGIN </Link>}
                        {props.logged && <Link to="/user" style={{textDecoration:'none', color:'white'}}>{props.user.name}</Link>}
                            </Button>
                        <Button className={classes.title}>
                        <Link to='/checkout' style={{textDecoration: 'none', color: 'white', paddingTop: '8px'}}>
                        <Badge badgeContent={props.cart?props.cart.length:0} color="secondary">
                            <LocalMallOutlinedIcon />
                        </Badge>
                        </Link>
                        </Button>
                    </Typography>
                    <Link to='/' style={{textDecoration: 'none', color: 'white', marginRight: '31%'}}> <Typography variant='h5' className={classes.charger}>CHARGER</Typography> </Link>
                    <SearchBar onSearch={props.getSearch} />
                </Toolbar>
            </AppBar>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        logged: state.logged,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        getSearch: search => dispatch(getSearch(search))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
