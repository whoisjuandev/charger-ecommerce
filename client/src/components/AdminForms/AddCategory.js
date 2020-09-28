import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import CategoriesTable from './CategoriesTable'

const useStyles = makeStyles(theme => ({
  cont: {
    background: '#3D3D3D',
  },
  root: {
    color: '#A4A4A4',
  },
}))

function AddCategory(props) {
  const classes = useStyles()

  const [addCategory, setAddCategory] = React.useState({
    name: '',
    description: '',
    message: 'Category created successfully!',
  })

  return (
    <Box className={classes.cont} my={0} p={3} height={'77.1vh'}>
      <Grid container justify="space-between" p={0}>
      <Grid item xs={5}>
        <CategoriesTable viewCategories={props.viewCategories} categories={props.categories} />
      </Grid>
        <Grid item xs={6}>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              props.addCategory(
                addCategory.name,
                addCategory.description,
                addCategory.message
              )
              setAddCategory({...addCategory, name: '', description: ''})
            }}
          >
            <TextField
              label="Name"
              onChange={e =>
                setAddCategory({...addCategory, name: e.target.value})
              }
              value={addCategory.name}
              placeholder="Name"
              helperText="Only letters"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <TextField
              label="Description"
              onChange={e =>
                setAddCategory({...addCategory, description: e.target.value})
              }
              value={addCategory.description}
              placeholder="Description"
              helperText="Only letters"
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

export default AddCategory
