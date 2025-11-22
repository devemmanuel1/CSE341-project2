const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// VALIDATION MIDDLEWARE (added)
const validateRequest = (req, res, next) => {
  const errors = [];
  const { firstname, lastname, email, age, major, gpa, course } = req.body;

  if (!firstname || typeof firstname !== 'string' || firstname.trim() === '') 
    errors.push('firstname is required and must be a non-empty string');
  if (!lastname || typeof lastname !== 'string' || lastname.trim() === '') 
    errors.push('lastname is required and must be a non-empty string');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) 
    errors.push('valid email is required');
  if (!age || !Number.isInteger(Number(age)) || age < 15 || age > 100) 
    errors.push('age must be an integer between 15 and 100');
  if (!major || typeof major !== 'string' || major.trim() === '') 
    errors.push('major is required and must be a string');
  if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4.0) 
    errors.push('gpa must be a number between 0.0 and 5.0');
  if (!course || typeof course !== 'string' || course.trim() === '') 
    errors.push('course is required and must be a string');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const getAll = async (req, res, next) => {
  const result = await mongodb.getDatabase().db().collection('Students').find();
  result.toArray().then(Students => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Students);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('Students').find({ _id: userId });
  result.toArray().then(Students => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Students[0]);
  });
};

const createUser = async (req, res, next) => {
  validateRequest(req, res, async () => {        // ← WRAPPED
    const user = {
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email,
      age: Number(req.body.age),
      major: req.body.major.trim(),
      gpa: Number(req.body.gpa),
      course: req.body.course.trim(),
    };
    const response = await mongodb.getDatabase().db().collection('Students').insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the Student info.');
    }
  });
};

const updateUser = async (req, res, next) => {
  validateRequest(req, res, async () => {        // ← WRAPPED
    const userId = new ObjectId(req.params.id);
    const user = {
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email,
      age: Number(req.body.age),
      major: req.body.major.trim(),
      gpa: Number(req.body.gpa),
      course: req.body.course.trim(),
    };
    const response = await mongodb.getDatabase().db().collection('Students').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Student info.');
    }
  });
};

const deleteUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('Students').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();          // ← Fixed from 201 to 204
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the Student info.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
  validateRequest      // ← EXPORT IT
};