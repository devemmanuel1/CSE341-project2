const router = require('express').Router();

router.get('/', (req, res) => {res.send('Welcome to my Second Project! 😉');
});

router.use("/users", require("./users"));
router.use('/courses', require('./courses'));

module.exports = router