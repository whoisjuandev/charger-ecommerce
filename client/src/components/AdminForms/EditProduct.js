import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
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

function EditProduct(props) {
  const classes = useStyles()

  const [modifyProduct, setModifyProduct] = React.useState({
    id: 0,
    name: '',
    description: '',
    price: '',
    stock: '',
    img: '',
    message: 'Product was successfully edited!',
  })

  return (
    <Box className={classes.cont} my={0} p={2} height={'86vh'}>
      <Grid container justify="space-around" p={0}>
      <Grid item xs={5}>
        <ProductsTable products={props.products} viewProducts={props.viewProducts} />
      </Grid>
        <Grid item xs={5}>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              props.modifyProduct(
                modifyProduct.id,
                modifyProduct.name,
                modifyProduct.description,
                modifyProduct.price,
                modifyProduct.stock,
                modifyProduct.img.split(',').map(x => x.replace(' ', '')),
                modifyProduct.message
              )
              setModifyProduct({
                id: 0,
                name: '',
                description: '',
                price: '',
                stock: '',
                img: '',
                message: 'Product was successfully edited!',
              })
            }}
          >
            <TextField
              label="Id"
              onChange={e =>
                setModifyProduct({...modifyProduct, id: e.target.value})
              }
              value={modifyProduct.id}
              placeholder="0"
              helperText="ID of the product to edit"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Name"
              onChange={e =>
                setModifyProduct({...modifyProduct, name: e.target.value})
              }
              value={modifyProduct.name}
              placeholder="Name"
              helperText="New name for the product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Description"
              onChange={e =>
                setModifyProduct({
                  ...modifyProduct,
                  description: e.target.value,
                })
              }
              value={modifyProduct.description}
              placeholder="description"
              helperText="New description for the product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Price"
              onChange={e =>
                setModifyProduct({...modifyProduct, price: e.target.value})
              }
              value={modifyProduct.price}
              placeholder="100.00"
              helperText="New price for the product"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Stock"
              onChange={e =>
                setModifyProduct({...modifyProduct, stock: e.target.value})
              }
              value={modifyProduct.stock}
              placeholder="10"
              helperText="New stock for the product "
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Images"
              onChange={e =>
                setModifyProduct({...modifyProduct, img: e.target.value})
              }
              value={modifyProduct.img}
              placeholder="imageOne.png,imageTwo.png,imegeThree.png"
              helperText="Only links to images, separed with ',' without spaces."
              fullWidth
              margin="normal"
              color="secondary"
            />
            <Button variant="contained" type="submit" color="secondary">
              Edit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditProduct
