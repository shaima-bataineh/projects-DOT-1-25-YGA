const express = require('express');
const {body, param, query} = require('express-validator');

const validate = require('../middlewares/validate');
const Products = require('../controllers/products.controller');

const router = express.Router();

router.post('/',
    body('name').isString().isLength({min: 3, max: 120}).trim(),
    body('price').isNumeric().custom(value => value >= 0),

    body('currency').isString().isLength({max: 3}).trim().toUpperCase(),
    body('inStock').isBoolean().toBoolean(),
    body('description').isString().trim(),
    body('tags').optional().isArray(),
    body('meta').optional().isObject(),
    validate,
    Products.createProduct);