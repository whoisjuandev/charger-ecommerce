import React from 'react';
import CreateUser from '../components/LoginPage/createUser';
import Style from './createUserPage.module.css';
import {Fab} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

function CreateUserPage() {
  return (
    <div className={Style.imgBG}>
            <CreateUser />
            <div className={Style.iconDiv}>
                <Link to="/login" style={{textDecoration: 'none'}}>
                    <Fab variant="extended">
                        <ArrowBackIosIcon style={{marginRight: '8px'}} />
                        LOG IN
                    </Fab>
                </Link>
            </div>
        </div>
  )
}

export default CreateUserPage
