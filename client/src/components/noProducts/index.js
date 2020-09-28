import React from 'react'
import Style from './styles.module.css'

function NoProducts() {
    return (
        <div className={Style.backGround}>
            <div className={Style.title}>
                <h1>{'No hay ningún producto :('}</h1>
            </div>
        </div>
    )
}

export default NoProducts
