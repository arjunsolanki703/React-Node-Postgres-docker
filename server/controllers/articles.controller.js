
const { check, validationResult } = require("express-validator");
const knexConfig = require('../db/knexfile');
//initialize knex
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const moment = require("moment");
var CurDaytime = moment.utc().format("YYYY-MM-DD HH:mm:ss");

// Insert Article
exports.insertArticle = (req, res) => {
    console.log('first')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const heading = req.body.heading ? req.body.heading : '';
    const content = req.body.content ? req.body.content : '';
    var CurDaytime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    console.log(req.body)
    if (!heading) {
        return res.json({ success: false, message: 'Heading is required' });
    }

    knex('articles')
        .insert({ heading: heading, content: content, created_at: CurDaytime, updated_at: CurDaytime })
        .then((result) => {
            return res.json({ success: true, message: 'Articles added.' });
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        });

};

// Get All Article
exports.getArticle = (req, res) => {
    knex('articles')
        .then((articles) => {
            return res.json({ success: true, message: 'Articles list succesfully.', data: articles });
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        })

};

// Get One Article
exports.getOneArticle = (req, res) => {
    knex('articles')
        .where({ id: req.params.rid })
        .then((articles) => {
            return res.json({ success: articles[0] ? true : false, message: articles[0] ? 'Articles list succesfully.' : 'Articles not found..', data: articles[0] });
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        })

};

// Delete Article
exports.deleteArticle = (req, res) => {
    knex('articles')
        .where({ id: req.params.rid })
        .then((articles) => {
            knex('articles')
                .where({ id: req.params.rid })
                .delete()
                .then((r) => {
                    return res.json({ success: articles[0] ? true : false, message: articles[0] ? 'Articles deleted succesfully.' : 'Articles not found..', data: articles[0] });
                })
                .catch((err) => {
                    console.error(err);
                    return res.json({ success: false, message: 'An error occurred, please try again later.' });
                })
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        })

};

// Update Article
exports.updateArticle = (req, res) => {
    var CurDaytim1e = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    knex('articles')
        .where({ id: req.params.rid })
        .then((articles) => {
            if (req.body.heading || req.body.content) {
                knex('articles')
                    .where({ id: req.params.rid })
                    .update({
                        heading: req.body.heading,
                        content: req.body.content,
                        updated_at: CurDaytim1e
                    })
                    .then((r) => {
                        return res.json({ success: articles[0] ? true : false, message: articles[0] ? 'Articles updated succesfully.' : 'Articles not found..', data: { ...articles[0], heading: req.body.heading, content: req.body.content } });
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.json({ success: false, message: 'An error occurred, please try again later.' });
                    })
            } else {
                return res.json({ success: articles[0] ? true : false, message: articles[0] ? 'Articles updated succesfully.' : 'Articles not found..', data: articles[0] });
            }
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: 'An error occurred, please try again later.' });
        })
};
