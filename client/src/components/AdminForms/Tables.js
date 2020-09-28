import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'
import ProductsTable from './ProductsTable';
import CategoriesTable from './CategoriesTable'
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddDeleteCategoryToProduct from './AddDeleteCategoryToProduct';

const useStyles = makeStyles(theme => ({
  cont: {
      background: '#3D3D3D',
  },
  root: {
      color: '#A4A4A4',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))


function Tables({categories, viewCategories, products, viewProducts, removeCategoryProduct, addCategoryProduct}) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // const {categories, viewCategories, products, viewProducts} = props
  return (

    <Box className={classes.cont} my={0} p={3} height={'100vh'}>

      <Grid container justify='center' p={0}>

        <Grid container item xs={6}>
          <ProductsTable products={products} viewProducts={viewProducts}/>
        </Grid>
        <Button style={{position:'absolute'}} color='secondary' variant='contained' onClick={handleOpen}>
          SET CATEGORIES
        </Button>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <AddDeleteCategoryToProduct addCategoryProduct={addCategoryProduct} removeCategoryProduct={removeCategoryProduct}/>
        </Fade>
      </Modal>
        <Grid container item xs={6}>
          <CategoriesTable categories={categories} viewCategories={viewCategories}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Tables