var express = require('express');
var router = express.Router();
var todoModel = require('./users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get', function(req, res){
  todoModel.find()
  .then(result=> res.json(result))
  .catch(err=> res.json(err))
})

router.put('/update/:id', function(req, res){
  const {id} = req.params;
  todoModel.findByIdAndUpdate({_id:id},  {done : true}, { new: true })
  .then(result=> res.json(result))
  .catch(err=> res.json(err))
})

router.delete('/delete/:id', function(req, res){
  const {id} = req.params;
  todoModel.findByIdAndDelete(id)
  .then(result=> res.json(result))
  .catch(err=> res.json(err))
})


router.post('/add', function(req, res){
  const task = req.body.task; 
  todoModel.create({
    task: task 
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})



module.exports = router;
