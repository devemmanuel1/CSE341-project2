const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');

// GET all courses
router.get('/', coursesController.getAll);

// GET course by ID
router.get('/:id', coursesController.getSingle);

// POST create new course
router.post('/', coursesController.createCourse);

// PUT update course
router.put('/:id', coursesController.updateCourse);

// DELETE course
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
