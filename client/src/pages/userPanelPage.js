import React, { useState, useEffect } from 'react';
import { Box, AppBar, Tabs, Tab, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { connect } from 'react-redux';
import TabPanel from '../components/TabPanel';
import UserCard from '../components/UserCard';
import NavBarContainer from '../components/NavBar/Container'
import OrderCard from '../components/orderCard';
import { getOrders, getUserReviews, deleteReviews, modifyReview } from '../store/actions';
import { Link } from 'react-router-dom';
import SeeReviews from '../components/SeeReviews';
import { AccountSettings } from '../components/AccountSettings';
import imageProfileBG from '../assets/imgs/background-img-profile.png'

const useStyle = makeStyles({
    content: {
        marginTop: '4em',
        background: '#3d3d3d',
        height: '90.9vh'
    },
    appbar: {
        backgroundColor: '#3d3d3d',
        justifyContent: 'center',
        display: 'flex'
    },
    infoUser: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

function UserPanelPage ({user, orders, reviews, getOrders, userReviews, deleteReviews, getUserReviews, modifyReview}) {
    const [tab, setTab] = useState(0);

    const classes = useStyle();

    useEffect(() => {
        if(user)
            getOrders(user.id);
        }, [user]);

    useEffect(() => {
        if(user) {
            getUserReviews(user.id)
        }
    }, [])


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleChange(e, newValue) {
        setTab(newValue);
    }

    return (
        <>
        <NavBarContainer noTransparent={true}/>
        <ThemeProvider theme={darkTheme}>
        <Box compoent="div" className={classes.content}>
            <AppBar className={classes.appbar} position="static">
                <Tabs value={tab} onChange={handleChange} centered>
                    <Tab icon={<InfoIcon/>} label='INFORMATION' {...a11yProps(0)} />
                    <Tab icon={<ShoppingBasketIcon/>} label="ORDERS" {...a11yProps(1)} />
                    <Tab icon={<SettingsIcon/>} label="SETTINGS" {...a11yProps(2)} />
                    <Tab icon={<RateReviewIcon/>} label="REVIEWS" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <div className={classes.infoUser}>
            {/* USER INFORMATION */}
            <TabPanel value={tab} index={0} style={{backgroundColor: 'black'}}>
                {user && (<UserCard
                    name={`${user.name} ${user.lastName}`}
                    email={user.email}
                    address={user.address}
                    />)}
            </TabPanel>
            </div>

            {/* ORDERS */}
            <div className={classes.infoUser}>
            <TabPanel value={tab} index={1}>
                {orders.map((order, index) => (
                    <Link to={`/order/${order.id}`} style={{textDecoration: 'none'}} key={index}>
                        <OrderCard
                            id={order.id}
                            status={order.state}
                            products={order.shoppingCart.content} />
                    </Link>
                ))}
            </TabPanel>
            </div>

            {/* ACCOUNT SETTINGS */}
            <TabPanel value={tab} index={2}>
                  <div style={{width: '100%', display: 'flex', margin: 0, justifyContent: 'center', alignItems: 'center'}}>
                    {user && (<AccountSettings 
                          user={user}
                          />)
                    }  
                  </div>
            </TabPanel>

            {/* REVIEWS */}
            <TabPanel value={tab} index={3}>
                <SeeReviews reviews={reviews} userReviews={userReviews} deleteReviews={deleteReviews} getUserReviews={getUserReviews} user={user} modifyReview={modifyReview}/>
            </TabPanel>
        </Box>
        </ThemeProvider>
    </>
    )
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        user: state.user,
        userReviews: state.userReviews,
        reviews: state.reviews
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserReviews: (userId) => dispatch(getUserReviews(userId)),
        deleteReviews: (reviewId, message) => dispatch(deleteReviews(reviewId, message)),
        getOrders: (userId) => dispatch(getOrders(userId)),
        modifyReview: (id, commentary, message)=> dispatch(modifyReview(id, commentary, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelPage);
