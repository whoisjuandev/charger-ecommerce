import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateAdmin = ({component: Component, user, ...rest}) =>(
    <Route
        {...rest}
        render={props =>
            user && user.rol === 'admin' ? (
                <Component {...props}/>
            ) : (    
               <Redirect to='/' />
            )
        }
    />
); 

export default connect(state => ({
    user: state.user
}))(PrivateAdmin);