const router = require('express').Router();
const User = require('../model/User');

//root route is /api/user

router.get('/:email/store', async (req, res, next) => {
    const { email } = req.params;
    const user = await User.findOne(
        { email: email },
        { orders: [] }
    );
    res.status(201).json(user);
});

router.post('/:email/store', async (req, res, next) => {
    const { email } = req.params;
    const { orderObj } = req.body;
    try {
        const user = await User.findOne(
            { email: email },
            { orders: [] } 
        );
        const orders = user.orders;

        // not a duplicate? Then update array.
        if(orders.filter(order=>order.uri === orderObj.uri).length === 0) {
            await User.updateOne(
                { email: email },
                [
                    {
                        $set: {
                            orders: [...orders, orderObj]
                        }
                    }
                ])
            res.status(201).json(user);
        }
        else {
            res.status(400).json(user);
        }
        
    } catch(err) {
        // res.status(400).json(err);
        console.log(err);
    }
});

module.exports = router;