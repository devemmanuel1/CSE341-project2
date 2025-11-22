const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateRequest } = require('../controllers/users');  // ← ADDED

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/', validateRequest, usersController.createUser);      // ← ADDED middleware
router.put('/:id', validateRequest, usersController.updateUser);    // ← ADDED middleware

router.delete('/:id', usersController.deleteUser);

module.exports = router;