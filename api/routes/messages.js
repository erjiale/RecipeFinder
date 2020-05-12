const router = require('express').Router();
const { socketServer } = require('../socket/socketHelper');
const Message = require('../model/Message');

//root route is /api/messages
router.get('/', async (req, res, next)=> {
    const message = await Message.find();
    res.send(message);
});

router.post('/:toId', async (req, res, next)=> {
    const { toId } = req.params;
    const { senderId, text } = req.body;
    const message = new Message({ 
        senderId,
        receiverId: toId,
        text
    });
    message.save();
    socketServer().emit('chat', { message: message });
    res.send(message);
});

module.exports = router;