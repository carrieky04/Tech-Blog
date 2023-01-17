const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all blog posts by title ,date created, and user id
router.get('/', async (req, res) => {
console.log("🚀 ~ file: homeRoutes.js:7 ~ router.get ~ req", req)

    try {
      const postData = await Post.findAll({
        attributes: ['title', 'date_created', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['user_name'],
            }
        ]
      });
    //   res.status(200).json(postData)

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Display all blog post content by ID
router.get('/post/:id', async (req, res) => {
    console.log("🚀 ~ file: homeRoutes.js:27 ~ router.get ~ req", req)
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                }
            ]
        });
        // console.log(postData)

        // res.status(200).json(postData);

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update blog post with a comment
// router.put('/post/:id', async (req, res) => {
//     try {
//         const updatedPost = await Post.update(req.body, {
//             where: {
//                 id: req.params.id,
//             }
//         })

//         if(!updatedPost) {
//             res.status(404).json({ message: 'No post found with this id!'});
//             return;
//         }
//         res.status(200).json(updatedPost);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// Display Login Page if not signed in
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

// Render user dashboard if signed in
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        // res.status(200).json(userData)
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;