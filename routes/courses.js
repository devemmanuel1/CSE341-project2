const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { validateRequest } = require('../controllers/courses');
const { ensureAuthenticated } = require('../middleware/authenticate');  // ← FIXED PATH + NAME

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);

router.post('/', ensureAuthenticated, validateRequest, coursesController.createCourse);
router.put('/:id', ensureAuthenticated, validateRequest, coursesController.updateCourse);
router.delete('/:id', ensureAuthenticated, coursesController.deleteCourse);

module.exports = router;