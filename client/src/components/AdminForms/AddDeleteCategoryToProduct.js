import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    cont: {
        background: '#3D3D3D',
    },
    root: {
        color: '#A4A4A4',
    },
    boxStyle: {
      border: '2px solid #fafafa',
      borderRadius: '20px',
      background: '#3D3D3D'
    }
}))

function AddDeleteCategoryToProduct(props) {
    const classes = useStyles()

    const [addCategoryProduct, setAddCategoryProduct] = React.useState({
      productId: '',
      categoryId: '',
      mode: true
    });

    const addedMessage = `Category ${addCategoryProduct.categoryId} was successfully added to product ${addCategoryProduct.productId}!`

    const removeMessage = `Category ${addCategoryProduct.categoryId} was successfully removed from product ${addCategoryProduct.productId}!`

    return (
        <Box className={classes.cont} my={0} p={3} className={classes.boxStyle}>
            <Grid container justify="center" p={0} direction="column">
            <form autoComplete='off' onSubmit={(e) => {
        e.preventDefault();
        if(addCategoryProduct.mode)
          props.addCategoryProduct(addCategoryProduct.productId, addCategoryProduct.categoryId, addedMessage);
        else
          props.removeCategoryProduct(addCategoryProduct.productId, addCategoryProduct.categoryId, removeMessage);
      }}>
        <TextField
                label="Category ID"
                onChange={(e) => setAddCategoryProduct({...addCategoryProduct, categoryId: e.target.value })}
                value={addCategoryProduct.categoryId}
                placeholder="0"
                helperText="ID of the category"
                fullWidth
                color="secondary"
                margin="normal"
              />
              <TextField
                label="Product ID"
                onChange={(e) => setAddCategoryProduct({...addCategoryProduct, productId: e.target.value })}
                value={addCategoryProduct.productId}
                placeholder="0"
                helperText="ID of the product"
                fullWidth
                color="secondary"
                margin="normal"
              />
              <div style={{color: '#fafafa'}}>
                Delete
                <Switch
                  checked={addCategoryProduct.mode}
                  onChange={e => setAddCategoryProduct({...addCategoryProduct, mode: !(addCategoryProduct.mode)})}
                  name="asd"
                  color="secondary"
                  
                />
                Add
              </div>
                <Divider />
                <Button variant="contained" type="submit" color="secondary" style={{marginTop: '15px'}}>
                  Send
                </Button>
            </form>
            </Grid>
        </Box>
    )
}

export default AddDeleteCategoryToProduct
