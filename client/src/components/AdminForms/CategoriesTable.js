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

function CategoriesTable(props) {
    const classes = useStyles()

    return (
        <Box className={classes.cont} my={0} p={3} height={'73.6vh'} width={1}>
            <Grid container justify="center" p={0} direction="column">
                <Grid item style={{paddingBottom: '10px', textAlign:'center'}}>
                    <Typography variant="h3" style={{color: '#fafafa'}} >
                        Categories
                    </Typography>
                </Grid>
                <Grid item>
                    <NewTable
                        columns={['ID', 'Name', 'Description']}
                        data={props.categories.map(data => [
                            data.id,
                            data.name,
                            data.description,
                        ])}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={props.viewCategories}
                        color="secondary"
                        style={{
                            position: 'fixed',
                            right: '0',
                            bottom: '0',
                            marginBottom: '30px',
                            marginRight: '30px',
                        }}
                    >
                        View Categories
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CategoriesTable
