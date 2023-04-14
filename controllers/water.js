const express = require('express');
const Water = require('../models/waters');
const router = express.Router();

// Index
router.get('/',  async (req, res) => {
    const foundWaters = await Water.find({})
	res.render('waters/index.ejs', {
        waters: foundWaters,
        currentUser: req.session.currentUser
    })
});

// New
router.get('/new', (req, res) => {
	res.render('waters/new.ejs', {
        currentUser: req.session.currentUser
    });
});

//  Delete
router.delete('/:id', async (req,res) => {
    await Water.findByIdAndRemove(req.params.id)
    res.redirect('/water')
})

//  Update
router.put('/:id', async (req, res) => {
    await Water.findByIdAndUpdate(
        req.params.id,
        req.body,
    )
    res.redirect('/water')
})

// Update/Add Review
router.put('/:id/reviews', async(req, res) => {
    let reviewObject = req.body
    const {id} = req.params
    await Water.findOneAndUpdate(
        { _id: id }, 
        { $push: { reviews: reviewObject } }, 
        { new: true },
    ) 
    res.redirect('/water')
})

// Create 
router.post('/', (req, res) => {
    const createdWater = new Water(req.body)
    createdWater.save().then(res.redirect('/water'))
})

// Edit
router.get('/:id/edit', async (req, res) => {
    const foundWater = await Water.findById(req.params.id)
    res.render('waters/edit.ejs', {
        water: foundWater,
        currentUser: req.session.currentUser
    })
})

// Show
router.get('/:id', async(req, res) => {
    const water = await Water.findById(req.params.id).exec()
    res.render('waters/show.ejs', {
        water,
        currentUser: req.session.currentUser
    })
})



module.exports = router