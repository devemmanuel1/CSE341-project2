const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateRequest } = require('../controllers/users');
const { ensureAuthenticated } = require('../middleware/authenticate');  // ← FIXED PATH + NAME

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/', ensureAuthenticated, validateRequest, usersController.createUser);
router.put('/:id', ensureAuthenticated, validateRequest, usersController.updateUser);
router.delete('/:id', ensureAuthenticated, usersController.deleteUser);

module.exports = router;