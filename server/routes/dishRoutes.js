const express = require('express');
const mongoose = require('mongoose');
const Dish = require('../models/Dish');

const router = express.Router();

// Reject ids that are not valid MongoDB ids
const checkId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid dish id' });
  }
  next();
};

// GET all dishes
router.get('/', async (req, res, next) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (err) {
    next(err);
  }
});

// GET one dish
router.get('/:id', checkId, async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    next(err);
  }
});

// POST create dish
router.post('/', async (req, res, next) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (err) {
    next(err);
  }
});

// PUT update whole dish
router.put('/:id', checkId, async (req, res, next) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    next(err);
  }
});

// PATCH change only availability
router.patch('/:id/availability', checkId, async (req, res, next) => {
  try {
    const { availability } = req.body;
    if (typeof availability !== 'boolean') {
      return res.status(400).json({ message: 'availability must be true or false' });
    }
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true }
    );
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    next(err);
  }
});

// DELETE dish
router.delete('/:id', checkId, async (req, res, next) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;