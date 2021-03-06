var router = require('express').Router();
var db = require('../db');
var Log = db.import('../models/log');
var User = db.import('../models/user');
var Definition = db.import('../models/definition');

router.post('/', function(req, res) {
    var description = req.body.log.desc;
    var result = req.body.log.result;
    var user = req.user;
    var definition = req.body.log.def;

    // Use our sequlize model to create user
   Log
	    .create({
	    	description: description,
	    	result: result,
	    	owner: user.id,
	    	def: definition
	    })
	    .then(
	    	function createSuccess(log) {
	    		res.json(log);
	    	},
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});

router.get('/', function(req, res) {
	var userid = req.user.id;
	Log
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

router.get('/:id', function(req, res){
  var data = req.params.id;
  Log
    .findOne({
      where: { id:data }
    }).then(
      function getSuccess(updateData){
        res.json(updateData);
      },
      function getError(err){
        res.send(500, err.message);
      }
    );
});

router.put('/', function(req, res){
  var description = res.body.log.desc;
  var result = res.body.log.result;
  var data = res.body.log.id;
  var definition = res.body.log.def;
  console.log(req);

  Log
    .update({
      description: description,
      result: result,
      def: definition
    },
    {where: { id: data} }
  ).then(
    function updateSuccessful(updatedLog){
      res.json(updatedLog);
    },
    function updateError(err){
      res.send(500, err.message);
    }
  )
});

router.delete('/', function(req,res){
  var data = req.body.log.id;
  Log
    .destroy({
      where: { id: data }
    }).then(
      function deleteLogSuccess(data){
        res.send("you removed a log");
      },
      function deleteLogError(err){
        res.send(500, err.message);
      }
    );
});

module.exports = router;
