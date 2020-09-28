import {forwardRef, useEffect} from 'react'
import React from 'react'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

function SeeReviews({deleteReviews, userReviews, getUserReviews, user, modifyReview, reviews}) {

  useEffect(() => {
    if(user) {
      getUserReviews(user.id)
    }
  }, [])
  
  // console.log(reviews)

  const data = reviews && reviews.map(review => {
    return {
      commentary: review.commentary || 'No commentary',
      rating: review.rating || 1,
      product: review. product.name || 'Product 1',
      reviewId: review.id || 0,
    }
  })

  return (
    <div>
      <MaterialTable
        title='All reviews'
        icons={tableIcons}
        data={data}
        columns={[
          {title: 'Commentary', field: 'commentary', editable: 'onUpdate'},
          {title: 'Rating', field: 'rating', editable: 'never', type: 'numeric'},
          {title: 'Product', field: 'product', editable: 'never'},
          {title: 'ID', field: 'reviewId', editable: 'never'}
        ]}
        editable={{
          onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const idReview = oldData.reviewId
              deleteReviews(idReview, `Review ${oldData.reviewId} was successfully deleted!`)
              resolve()
            }, 1000)
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              modifyReview(oldData.reviewId, newData.commentary, `Review ${oldData.reviewId} was successfully modified!`);

              resolve();
            }, 1000)
          }),
        }}
      />
    </div>
  )
}


export default  SeeReviews;
