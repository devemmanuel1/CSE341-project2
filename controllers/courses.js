const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL COURSES
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Courses').find();
    result.toArray().then((courses) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    });
};

// GET COURSE BY ID
const getSingle = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Courses').find({ _id: courseId });

    result.toArray().then((courses) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses[0]);
    });
};

// CREATE COURSE
const createCourse = async (req, res) => {
    const course = {
        title: req.body.title,
        code: req.body.code,
        creditHours: req.body.creditHours,
        instructor: req.body.instructor,
        description: req.body.description
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('Courses')
        .insertOne(course);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error creating course.');
    }
};

// UPDATE COURSE
const updateCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);

    const course = {
        title: req.body.title,
        code: req.body.code,
        creditHours: req.body.creditHours,
        instructor: req.body.instructor,
        description: req.body.description
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('Courses')
        .replaceOne({ _id: courseId }, course);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error updating course.');
    }
};

// DELETE COURSE
const deleteCourse = async (req, res) => {
    const courseId = new ObjectId(req.params.id);

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('Courses')
        .deleteOne({ _id: courseId });

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
    deleteCourse
};
