import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'
import { getCategories, logout } from '../../store/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(()=>({
    categories:{
        color: 'white',
        "&:hover":{
            color: '#9C9C9C',
            transition: '0.3s'
        },
        textDecoration: 'none',
    },
    list: {
        paddingLeft: 8
    },
    admin:{
        color: 'white',
        "&:hover":{
            color: '#9C9C9C',
            transition: '0.3s'
        },
        textDecoration: 'none',
    },
}))

function List({categories, logged, onSignout, user}){
    const classes = useStyles()

    return(
        <div className={classes.list}>
            {categories
                .filter(cat => 
                    (cat.name === 'Type' || cat.name === 'Season')
                ).map((cat, index) => (
                    <Link key={index} to={`/category/${cat.id}`} className={classes.categories}><h1>{cat.description.toUpperCase()}</h1></Link>
                ))
            }
            {user && user.rol === 'admin' ?
                <Link to='/admin' className={classes.admin}>
                <h1>ADMIN</h1>
            </Link>
        : null}
            {logged && (<Link onClick={e => {e.preventDefault(); onSignout();}} className={classes.admin}><h1>SIGN OUT</h1></Link>)}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        logged: state.logged,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories),
        onSignout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);