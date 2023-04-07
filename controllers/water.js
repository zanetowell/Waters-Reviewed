const express = require('express');
const Water = require('../models/waters');
const router = express.Router();

// Index
router.get('/', async (req, res) => {
    const foundWaters = await Water.find({})
	res.render('index.ejs', {
        waters: foundWaters
    });
});

// New
router.get('/new', (req, res) => {
	res.render('articles/new.ejs');
});

// Delete
router.delete('/:id', async (req,res) => {
    await Article.findByIdAndRemove(req.params.id)
    res.redirect('/articles')
})

// Update
router.put('/:id', async (req, res) => {
    await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
    )
    res.redirect('/articles')
})

// Create 
router.post('/', (req, res) => {
    const createdArticle = new Article(req.body)
    createdArticle.save().then(res.redirect('/articles'))
})

// Edit
router.get('/:id/edit', async (req, res) => {
    const foundArticle = await Article.findById(req.params.id)
    res.render('articles/edit.ejs', {
        article: foundArticle
    })
})

// Show
router.get('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id).exec()
    res.render('articles/show.ejs', {
        article
    })
})



module.exports = router;