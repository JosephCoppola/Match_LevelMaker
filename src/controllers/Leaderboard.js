var _ = require('underscore');
var models = require('../models');

var Leaderboard = models.Leaderboard;

var colors = ["rgb(22, 47, 31)","rgb(9, 34, 67)","rgb(52, 62, 28)","rgb(4, 74, 30)","rgb(9, 49, 100)"];
var secondaryColors = ["rgb(30, 86, 51)","rgb(31, 52, 78)","rgb(140, 154, 105)","rgb(81, 118, 95)","rgb(76, 90, 107)"];

//Used when a GET /leaders occurs
var leaderPage = function(req,res){
	
	console.log(req.session);
	
	Leaderboard.LeaderboardModel.getAllLeaders(function(err,docs){
		
		console.log(docs);	
		
		if(err)
		{
			console.log(err);
			return res.status(400).json({error:"An error occurred"});
		}
		
		var colorIndex = Math.floor(Math.random() * 5);
		
		var _pageColors = {primary:colors[colorIndex],secondary:secondaryColors[colorIndex]};
		
		res.render('leaderboard', {csrfToken: req.csrfToken(), domos:docs, pageColors:_pageColors});
	});
};

//Creates a leader in the leaderboard POST
var makeLeader = function(req, res){
	
	//console.log(req.body.levelArray);
	
	var leaderData = {
		name: req.body.username,
		score: req.body.score
	};
	
	var newLeader = new Leaderboard.LeaderboardModel(leaderData);
	
	newLeader.save(function(err) {
		if(err){
			console.log(err);
			return res.status(400).json({error:"An error occured"});
		}
		
		res.json({redirect: "/leaders"});
	});
};

module.exports.leaderPage = leaderPage;
module.exports.makeLeader = makeLeader;