import {Grid} from '@material-ui/core';
import React, { useEffect } from 'react';
import OrdersTable from '../OrdersTable/';

function ListOrders({allOrders, getAllOrders, modifyOrdersState, cancelOrder}) {

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div style={{ background: '#3d3d3d', padding: '16px', height: '79.36vh'}}>
      <Grid container justify='center'>
          <OrdersTable allOrders={allOrders} getAllOrders={getAllOrders} modifyOrdersState={modifyOrdersState} cancelOrder={cancelOrder}/>
      </Grid>
    </div>
  )
}

export default  ListOrders;
