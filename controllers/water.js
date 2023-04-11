const express = require('express');
const Water = require('../models/waters');
const router = express.Router();

// Index
router.get('/',  async (req, res) => {
    const foundWaters = await Water.find({})
	res.render('index.ejs', {
        waters: foundWaters,
        currentUser: req.session.currentUser
    })
});

// New
router.get('/new', (req, res) => {
	res.render('new.ejs');
});

// // Delete
// router.delete('/:id', async (req,res) => {
//     await Article.findByIdAndRemove(req.params.id)
//     res.redirect('/articles')
// })

// // Update
// router.put('/:id', async (req, res) => {
//     await Article.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//     )
//     res.redirect('/articles')
// })
router.put('/:id/reviews', async(req, res) => {
    let reviewObject = req.body
    const {id} = req.params
    await Water.findOneAndUpdate(
        { _id: id }, 
        { $push: { reviews: reviewObject } }, 
        { new: true }
    ); 
    res.redirect('/:id')
})
// Create 
// router.post('/', (req, res) => {
//     const createdWater = new Water(req.body)
//     createdWater.save().then(res.redirect('/'))
// })


// // Edit
// router.get('/:id/edit', async (req, res) => {
//     const foundArticle = await Article.findById(req.params.id)
//     res.render('articles/edit.ejs', {
//         article: foundArticle
//     })
// })

// Show
router.get('/:id', async(req, res) => {
    const water = await Water.findById(req.params.id).exec()
    res.render('show.ejs', {
        water,
        currentUser: req.session.currentUser
    })
})



module.exports = router