const router = require('express').Router();
const User = require('../model/User');

//root route is /api/user

router.get('/:email/orders', async (req, res, next) => {
    const { email } = req.params;
    const user = await User.findOne(
        { email: email },
        { orders: [] }
    );
    res.status(201).json(user);
});

router.post('/:email/orders', async (req, res, next) => {
    const { email } = req.params;
    const { orderObj } = req.body;
    try {
        const user = await User.findOne(
            { email: email },
            { orders: [] },
        );
        const orders = user.orders;

        // ADMIN - add to Store same item only once
        if(email === 'admin@gmail.com') {
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
        } // CUSTOMER - order recipes from store as much as they want
        else {
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
        
        
    } catch(err) {
        // res.status(400).json(err);
        console.log(err);
    }
});

router.delete('/:email/orders/:uri', async (req, res, next) => {
    const uri = decodeURIComponent(req.params.uri);
    const { email } = req.params;
    try {
        const user = await User.findOne(
            { email: email },
            { orders: [] }
        );
        const orders = user.orders;
        await User.updateOne(
            { email: email },
            [
                {
                    $set: {
                        orders: orders.filter(order => order.uri !== uri)
                    }
                }
            ]
        );
        res.status(204).json(user);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;