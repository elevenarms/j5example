
/*
 * GET home page.
 */

exports.sweep = function(req, res){
  
  servo.sweep();
  res.render('index', { title: 'Express' });
};