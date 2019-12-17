const router = require('express').Router();
const itemModel = require('../models/item');
const userModel = require('../models/user');



router.route('/subscribe').put((req, res, next) => {
    const { itemId, userId } = req.body;
    itemModel.updateOne({ _id: itemId }, { $push: { subscribers: userId } }).
        then(props => {
            userModel.updateOne({ _id: userId }, { $push: { items: itemId } })
                .then(() => res.send(props));
        }).catch(next)

});

router.route('/').get((req, res) => {
    itemModel.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = (req.body.duration);
    const date = (req.body.date);
    const price = (req.body.price);
    const location = req.body.location;
    const url = req.body.url;
    const users = req.body.users;
    const category = req.body.category;

    const newItem =  new itemModel({
        username,
        description,
        duration,
        date,
        price,
        location,
        url,
     //   users,
        category
    });
    console.log(newItem)

    newItem.save()
        .then(() => {
            res.json('Item added!');
        })
        .catch(err => res.status(400).json('Error: ' + err + '----' + console.log( newItem) ));
});

router.route('/:id').get((req, res) => {
    itemModel.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    itemModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    itemModel.findById(req.params.id)
        .then((item) => {
            item.username = req.body.username;
            item.description = req.body.description;
            item.duration = Number(req.body.duration);
            item.date = Date.parse(req.body.date);
            item.price = Number(req.body.price);
            item.location = req.body.location;
            item.url = req.body.url;
            item.category = req.body.category;
            item.save()
                .then(() => res.json('Item updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;