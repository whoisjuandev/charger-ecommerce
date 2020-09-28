import React, { useEffect, useState } from 'react'
import {Divider, Grid} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'; 
import ProductImage from './ProductImage'
import InfoProduct from './InfoProduct'
import Container from '../NavBar/Container'
import { connect } from 'react-redux'
import { getProducts, getCart, addToCart, getReviews} from '../../store/actions'
import { useParams } from 'react-router-dom'
import Comments from './Comments';

// const productPrueba = {
//     title: 'Bomber Supreme - S20',
//     description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reiciendis minima repudiandae. Nobis, quod voluptatibus voluptatem cumque, deserunt tempora ipsam laudantium, explicabo quidem quibusdam suscipit mollitia tenetur omnis consequuntur obcaecati',
//     price: 2999,
//     talles: ['S', 'M', 'L', 'XL']
// }


const imagenPrueba = [
    'https://images.unsplash.com/photo-1520294890956-4a240865ae85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
    'https://images.unsplash.com/photo-1503431194692-82dd03d18093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
]



function ProductPage({products, getProducts, cart, getCart, addToCart, reviews,  getReviews}) {


    
    const sectionStyle = {
        height: '100vh',
        background: `url(${imagenPrueba[1]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '0% 50%',
        backdropFilter: 'blur(20px)',
        color: 'white'
    }
    const [productId, setProductId] = React.useState(useParams().product)

    const id = parseInt(useParams().product);

    const prod = products.filter(prod => prod.id === id)[0];
  console.log(reviews);
    
    const promedio = (reviews) => {
      var p=0;
      for(var i=0; i < reviews.length; i++){
	p += reviews[i].rating;
      }
      return p = p/reviews.length;
    }

    useEffect(() => {
        getProducts();
        getReviews(productId);
    }, []);
    
    return (
        <div style={sectionStyle}>
            <Container />
                {prod?(
                    <Grid container justify='center' alignItems='center' style={{maxWidth:1366, maxHeight:768, paddingTop: '80px', backdropFilter: 'blur(10px)', paddingBottom: '40px'}}>
                        <Grid container item  xs={6} lg={6}>
                            <ProductImage src={prod.imgs[0].url} />
                        </Grid>
                        <Grid container item  xs={6} lg={6} justify='center' alignContent='center' style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <InfoProduct title={prod.name} description={prod.description} price={prod.price} talle={"XL"} stock={prod.stock} addToCart={addToCart} product={prod}/>
			  <Rating name="read-only" value={promedio(reviews) !== undefined? promedio(reviews) :0} readOnly /> 
                            
                            <Grid style={{marginTop:20}}>
			     { reviews.length>0 ? <Comments data={reviews}/> : null}
                            </Grid>
                        </Grid>
                    </Grid>
                ):'Loading'}

        </div>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products,
        reviews: state.reviews
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts()),
        addToCart: (product, message) => dispatch(addToCart(product, message)),
        getReviews: (productId) => dispatch(getReviews(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
