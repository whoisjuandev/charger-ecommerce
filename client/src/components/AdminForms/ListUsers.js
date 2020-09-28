import {Grid} from '@material-ui/core';
import React, { useEffect } from 'react';
import UserTable from './UserTable';

function ListUsers({users, getAllUsers, deleteUser, makeAdmin, getUserReviews, modifyReview, deleteReviews, reviews}) {

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div style={{height: '79.36vh', background: '#3d3d3d', padding: '16px'}}>
      <Grid container justify='center'>
          <UserTable users={users} deleteUser={deleteUser} makeAdmin={makeAdmin} getAllUsers={getAllUsers} getUserReviews={getUserReviews} modifyReview={modifyReview} deleteReviews={deleteReviews} reviews={reviews}/>
      </Grid>
    </div>
  )
}

export default  ListUsers
