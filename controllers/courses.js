const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// VALIDATION MIDDLEWARE (added)
const validateRequest = (req, res, next) => {
  const errors = [];
  const { title, code, creditHours, instructor, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') 
    errors.push('title is required and must be a string');
  if (!code || typeof code !== 'string' || code.trim().length < 3) 
    errors.push('code is required and minimum 3 characters');
  if (!creditHours || !Number.isInteger(Number(creditHours)) || creditHours < 1 || creditHours > 10) 
    errors.push('creditHours must be integer 1-10');
  if (!instructor || typeof instructor !== 'string' || instructor.trim() === '') 
    errors.push('instructor is required and must be a string');
  if (!description || typeof description !== 'string' || description.trim() === '') 
    errors.push('description is required and must be a string');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('Courses').find();
  result.toArray().then((courses) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses);
  });
};

const getSingle = async (req, res) => {
  const courseId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('Courses').find({ _id: courseId });
  result.toArray().then((courses) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(courses[0]);
  });
};

const createCourse = async (req, res) => {
  validateRequest(req, res, async () => {       // ← WRAPPED
    const course = {
      title: req.body.title.trim(),
      code: req.body.code.trim(),
      creditHours: Number(req.body.creditHours),
      instructor: req.body.instructor.trim(),
      description: req.body.description.trim()
    };

    const response = await mongodb.getDatabase().db().collection('Courses').insertOne(course);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error creating course.');
    }
  });
};

const updateCourse = async (req, res) => {
  validateRequest(req, res, async () => {       // ← WRAPPED
    const courseId = new ObjectId(req.params.id);
    const course = {
      title: req.body.title.trim(),
      code: req.body.code.trim(),
      creditHours: Number(req.body.creditHours),
      instructor: req.body.instructor.trim(),
      description: req.body.description.trim()
    };

    const response = await mongodb.getDatabase().db().collection('Courses').replaceOne({ _id: courseId }, course);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error updating course.');
    }
  });
};

const deleteCourse = async (req, res) => {
  const courseId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('Courses').deleteOne({ _id: courseId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error deleting course.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse,
  validateRequest      // ← EXPORT IT
};