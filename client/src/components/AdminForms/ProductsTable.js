import React from 'react';
import NewTable from './table.js';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    cont: {
        background: '#3D3D3D',
    },
    root: {
        color: '#A4A4A4',
    },
}))

function ProductsTable(props) {
    const classes = useStyles()

    return (
        <Box className={classes.cont} my={0} p={3} height={'73.6vh'} width={1}>
            <Grid container justify="center" p={0} direction="column">
                <Grid item style={{paddingBottom: '10px', textAlign:'center'}}>
                    <Typography variant="h3" style={{color: 'white'}}>
                        Products
                    </Typography>
                </Grid>
                <Grid item>
                    <NewTable
                        columns={['ID', 'Name', 'Price', 'Stock']}
                        data={props.products.map(data => [
                            data.id,
                            data.name,
                            data.price,
                            data.stock,
                        ])}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={props.viewProducts}
                        color="secondary"
                        style={{
                            position: 'fixed',
                            left: '0',
                            bottom: '0',
                            marginBottom: '30px',
                            marginLeft: '30px',
                        }}
                    >
                        View Products
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductsTable
