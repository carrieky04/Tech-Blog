// const router = require('express').Router();
// const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   console.log('test 1')
//     try {
//       const postData = await Post.findAll({
//         include: [
//             {
//                 model: User,
//                 attributes: ['user_name'],
//             },
//         ],
//       });

//       const posts = postData.map((post) => post.get({ plain: true }));

//       res.render('homepage', {
//         posts,
//         logged_in: req.session.logged_in
//       });
//       console.log('test 2')
//     } catch (err) {
//         res.status(500).json(err);
//         console.log('error')
//     }
// });