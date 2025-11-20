const router = require('express').Router();

router.get('/', (req, res) => {res.send('Welcome to my Second Project! 😉');
});

router.use("/users", require("./users"));

module.exports = router