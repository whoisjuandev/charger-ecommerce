const { Router } = require('express');
const { User, Checkout, ShoppingCart } = require('../db');
const { isAuthenticated } = require('../passport');

const router = Router();

router.get('/:user', (req, res) => {
    const { user } = req.params;
    User.findOne({
        where: {
            id: user
        },
        include: [{
            model: Checkout,
            include: ShoppingCart
        }]
    }).then(user => {
        res.send({ orders: user.checkouts })
    }).catch(err => {
        res.status(500).send({ message: 'Internal error'});
        console.error(err);
    })
});

router.post('/confirm/:token', isAuthenticated, (req, res) => {
    const { id } = req.user;
    const { token } = req.params;

    let order = null;

    Checkout.findOne({
        where: {
            token
        },
        include: [ShoppingCart, {
            model: User,
            where: { id }
        }]
    }).then(checkout => {
        if(checkout && checkout.state === 'pending') {
            order = checkout;
            order.state = 'processing';
            return order.save();
        } else {
            res.status(400).send({ message: 'Invalid or already confirmed order' });
        }
    }).then(() => {
        res.send({ success: true , order});
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Interna error.'});
    })
});

module.exports = router;