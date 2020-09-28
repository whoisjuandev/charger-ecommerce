import React from 'react'
import {Link} from 'react-router-dom'
import Style from '../pages/homePage.module.css'
import Container from '../components/NavBar/Container'
import backgroundImages from '../components/arrayImgBG'

const randomImg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

const backgroundImageStyle = {
    height: '100vh',
    background: `url(${randomImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '0% 50%',
    color: 'white',
    padding: '0px',
    margin: '0px',
}

export default function HomePage() {

    return (
        <div style={backgroundImageStyle}>
            <Container />
            <div className={Style.title}>
                <h1>CHARGER</h1>
                <Link to='/catalog' className={Style.linkCatalogo}>VIEW PRODUCTS</Link>
            </div>
        </div>
    )
}