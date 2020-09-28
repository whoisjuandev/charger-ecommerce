import React from 'react'
import SizeSelect from '../SizeSelect'
import {Grid, Typography, Box} from '@material-ui/core'

function InfoProduct({title, description, price, stock, colors = [], talles = [], product, addToCart}) {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Box mt={2} textAlign="center">
                <Typography
                    variant="h3"
                    style={{borderBottom: '2px solid white'}}
                >
                    {title}
                </Typography>
                <Box mt={1} style={{width: 600}}>
                    <Typography variant="subtitle2">{description}</Typography>
                </Box>
                <Box mt={1} fontWeight="fontWeightMedium">
                <Typography variant="h4">${price}</Typography>
                </Box>
            </Box>
            <Box
                mb={2}
                direction="column"
                textAlign="center"
                style={{width: 250}}
            >
                <SizeSelect stock={stock} talles={talles} product={product} addToCart={addToCart}/>
            </Box>
        </Grid>
    )
}

export default InfoProduct
