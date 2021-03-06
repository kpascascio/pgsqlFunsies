var router = require('express').Router();
var db = require('../db');
var User = db.import('../models/user');
var bcrypt  = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
		var username = req.body.user.username;
		var pass = req.body.user.password;


		User.create({
			username: username,
			passwordhash: bcrypt.hashSync(pass, 10)
		}).then(
			function createSuccess(user){
				var token = jwt.sign({id:user.id}, "i_am_secret", {expiresIn: 60*60*24});
				res.json({
					user: user,
					message: 'created',
					sessionToken: token
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;
