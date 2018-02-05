var router = require('express').Router();
var db = require('../db');
var User = db.import('../models/definition');
var Definition = db.import('../models/definition');

router.post('/', function(req, res) {
    var description = req.body.definition.desc;
    var logType= req.body.definition.type;
    var user = req.user.id;
    // LAB IDEA - ensure we aren't duplicating descriptions
    // before we load it in
  	Definition
	    .create({
	    	description: description,
	    	logType: logType,
	    	owner: req.body.user.id
	    })
	    .then(
	    	function createSuccess(definition) {
	    		res.json({
	    			definition: definition
	    		});
	    	},
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});
router.get('/', function(req, res) {
	var userid = req.user.id;
	Definition
	.findAll({
		where: { owner: userid }
	})
	.then(
		function findAllSuccess(data) {
			// console.log(data);
			res.json(data);
		},
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});
module.exports = router;
