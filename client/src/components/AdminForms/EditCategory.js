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

function EditCategory(props) {
  const classes = useStyles()

  const [modifyCategory, setModifyCategory] = React.useState({
    id: 0,
    name: '',
    description: '',
    message: 'Category was successfully edited!',
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
              props.modifyCategory(
                modifyCategory.id,
                modifyCategory.name,
                modifyCategory.description,
                modifyCategory.message
              )
              setModifyCategory({
                ...modifyCategory,
                id: 0,
                name: '',
                description: '',
              })
            }}
          >
            <TextField
              label="Name"
              onChange={e =>
                setModifyCategory({...modifyCategory, name: e.target.value})
              }
              value={modifyCategory.name}
              placeholder="Name"
              helperText="New category name"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              onChange={e =>
                setModifyCategory({
                  ...modifyCategory,
                  description: e.target.value,
                })
              }
              value={modifyCategory.description}
              placeholder="Description"
              helperText="New category description"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Id"
              onChange={e =>
                setModifyCategory({...modifyCategory, id: e.target.value})
              }
              value={modifyCategory.id}
              placeholder="Name"
              helperText="ID of the category to edit"
              fullWidth
              margin="normal"
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

export default EditCategory
