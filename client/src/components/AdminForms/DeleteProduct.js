import React from 'react'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import ProductsTable from './ProductsTable'

const useStyles = makeStyles(theme => ({
  cont: {
    background: '#3D3D3D',
  },
  root: {
    color: '#A4A4A4',
  },
}))

function DeleteProduct(props) {
  const classes = useStyles()

  const [deleteProduct, setDeleteProduct] = React.useState({
    id: 0,
    message: 'Product was successfully removed!',
  })

  return (
    <Box className={classes.cont} my={0} p={2} height={'80vh'}>
      <Grid container justify="space-around" p={0}>
        <Grid item xs={5}>
          <ProductsTable
            products={props.products}
            viewProducts={props.viewProducts}
          />
        </Grid>
        <Grid item xs={5}>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              props.deleteProduct(deleteProduct.id, deleteProduct.message)
            }}
          >
            <TextField
              label="Id"
              onChange={e =>
                setDeleteProduct({
                  ...deleteProduct,
                  id: e.target.value,
                })
              }
              value={deleteProduct.id}
              placeholder="0"
              helperText="ID of the product to delete"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <Button variant="contained" type="submit" color="secondary">
              Delete
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeleteProduct
