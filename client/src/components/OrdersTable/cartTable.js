import {forwardRef, useEffect} from 'react'
import React from 'react'
import { browserHistory } from 'react-router'
import {  Redirect } from 'react-router-dom'
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
import PageviewIcon from '@material-ui/icons/Pageview'

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

function CartTable({ shoppingCart }) {

  const [redirect, setRedirect] = React.useState(false);
  const [id, setId] = React.useState(0);
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/product/${id}`} />
    }
  }

  const data = shoppingCart && shoppingCart.map(shoppingCart => {
    return {
      name: shoppingCart.name ,
      description: shoppingCart.description,
      amount: shoppingCart.amount,
      id: shoppingCart.id
    }
  })

  return (
    <div>
      <MaterialTable
        title='Detail'
        icons={tableIcons}
        data={data}
        columns={[
          {title: 'name', field: 'name', editable: 'never'},
          {title: 'amount', field: 'amount', editable: 'never'},
          {title: 'id', field: 'id', editable: 'never'},
        ]}
         actions={[
          rowData => ({
            icon: () => <PageviewIcon />,
            tooltip: 'See product page',
            onClick: () => {
	      setId(rowData.id);
	      setRedirect(true);
	    },
          }),
        ]}
      />
      {renderRedirect()}
    </div>
  )
}


export default  CartTable;
