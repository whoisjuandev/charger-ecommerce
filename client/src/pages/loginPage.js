import React from 'react'
import Login from '../components/LoginPage/loginCard'
import Style from './loginPage.module.css'
import {Fab} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'

function loginPage() {
    return (
        <div className={Style.imgBG}>
            <Login />
            <div className={Style.iconDiv}>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <Fab variant="extended">
                        <HomeIcon style={{marginRight: '8px'}} />
                        HOME
                    </Fab>
                </Link>
            </div>
        </div>
    )
}

export default loginPage
