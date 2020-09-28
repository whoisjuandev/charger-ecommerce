import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ProductsTable from './ProductsTable'

const useStyles = makeStyles(theme => ({
  cont: {
    background: '#3D3D3D',
  },
  root: {
    color: '#A4A4A4',
  },
}))

function CreateProducts(props) {
  const classes = useStyles()

  const [createProduct, setCreateProduct] = React.useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    img: '',
    message: 'Product created successfully!',
  })

  return (
    <Box className={classes.cont} my={0} p={3} height={'77.1vh'}>
      <Grid container justify="space-between" p={0}>
        <Grid item xs={5}>
          <ProductsTable
            products={props.products}
            viewProducts={props.viewProducts}
          />
        </Grid>
        <Grid item xs={6}>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              props.addProduct(
                createProduct.name,
                createProduct.description,
                createProduct.price,
                createProduct.stock,
                createProduct.img.split(',').map(x => x.replace(' ', '')),
                createProduct.message
              )
              setCreateProduct({
                name: '',
                description: '',
                price: '',
                stock: '',
                img: '',
                message: 'Product created successfully!',
              })
            }}
          >
            <TextField
              label="Name"
              onChange={e =>
                setCreateProduct({...createProduct, name: e.target.value})
              }
              value={createProduct.name}
              placeholder="West Jeans"
              helperText="Name for the new product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Description"
              onChange={e =>
                setCreateProduct({
                  ...createProduct,
                  description: e.target.value,
                })
              }
              value={createProduct.description}
              placeholder="Description"
              helperText="Description for the new product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Price"
              onChange={e =>
                setCreateProduct({...createProduct, price: e.target.value})
              }
              value={createProduct.price}
              placeholder="100.00"
              helperText="Price of the new product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Stock"
              onChange={e =>
                setCreateProduct({...createProduct, stock: e.target.value})
              }
              value={createProduct.stock}
              placeholder="10"
              helperText="Stock available for the new product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Images"
              onChange={e =>
                setCreateProduct({...createProduct, img: e.target.value})
              }
              value={createProduct.img}
              placeholder="imageOne.png,imageTwo.png,imegeThree.png"
              helperText="Only links to images, separed with ',' without spaces"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <Button variant="contained" type="submit" color="secondary">
              Create
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateProducts
