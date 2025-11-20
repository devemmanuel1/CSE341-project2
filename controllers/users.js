const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //swagger.tags = ['Users'];
const result = await mongodb.getDatabase().db().collection('Students').find();
    result.toArray().then(Students => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Students);
    });
};

const getSingle = async (req, res, next) => {
    //swagger.tags = ['Users'];
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Students').find({ _id: userId });
    result.toArray().then(Students => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Students[0]);
    });
};

const createUser = async (req, res, next) => {
    //swagger.tags = ['Users'];
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        major: req.body.major,
        gpa: req.body.gpa,
        course: req.body.course,
    };
    const response = await mongodb.getDatabase().db().collection('Students').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the Student info.');
    }
};

const updateUser = async (req, res, next) => {
    //swagger.tags = ['Users'];
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        major: req.body.major,
        gpa: req.body.gpa,
        course: req.body.course,
    };
    const response = await mongodb.getDatabase().db().collection('Students').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the Student info.');
    }
};
const deleteUser = async (req, res, next) => {
    //swagger.tags = ['Users'];
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Students').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(201).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the Student info.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};