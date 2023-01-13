const router = require('express').Router();
const { User } = require('../../models');

// Creates new user
router.post('/', async (req, res) => {
    console.log("🚀 ~ file: userRoutes.js:6 ~ router.post ~ req", req)
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json(err);
        console.log('ERROR')
    }
})



// User Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { user_name: req.body.user_name} });

        if(!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect user name or password, please try again'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect user name or password, please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

// User Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;