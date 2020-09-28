import React from 'react'
import { Box } from '@material-ui/core'


function ProductImage({src}) {
  return (
      <Box borderRadius={20} m={5} width={900} height={500} display='flex' justifyContent='center'>
        <img src={src} alt="" style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover',borderRadius:20, border:'3px solid white'}}/>
      </Box>
  )
}

export default ProductImage
