const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { validateRequest } = require('../controllers/courses');  // ← ADDED

// GET all courses
router.get('/', coursesController.getAll);

// GET course by ID
router.get('/:id', coursesController.getSingle);

// POST create new course
router.post('/', validateRequest, coursesController.createCourse);     // ← ADDED

// PUT update course
router.put('/:id', validateRequest, coursesController.updateCourse);   // ← ADDED

// DELETE course
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;