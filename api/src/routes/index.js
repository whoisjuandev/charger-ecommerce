const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const userRouter = require("./user.js");
const checkoutRouter = require("./checkout");
const orderRoutes = require("./order");
const reviews = require('./reviews.js')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/checkout", checkoutRouter);
router.use("/order", orderRoutes);

router.use("/reviews", reviews);
module.exports = router;
