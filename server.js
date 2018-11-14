//express
const express = require('express');
const app = express();

//body-parser

const bodyParser = require('body-parser');
// configure body-parser to read JSON
app.use(bodyParser.json());

app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist/public' ));
//changing the Welcome To mean stack assignment, you'll need to go to app folder and inside, you'll be able to check the app.component.ts


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myrestful');

var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,

}, {
    timestamps: true
});

mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User' Registering Model
var Task = mongoose.model('Task')

app.get('/tasks', function (req, res) {
    //GET: Retrieve all Tasks
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log('There was an error')
        }
        res.json(tasks)
    })
})

app.get('/tasks/:id', function (req, res) {
    //GET: Retrieve a Task by ID
    Task.findOne({
        _id: req.params.id
    }, function (err, tasks) {
        if (err) {
            console.log('There was an error')
        }
        res.json(tasks)
    })
})

app.post('/new', (req, res) => {
    //POST: Create a Task
    const task_inst = new Task();
    task_inst.title = req.body.title;
    task_inst.description = req.body.description;
    task_inst.save(function (err) {
        if (err) {} else {
            console.log("POST DATA", req.params);
            res.json(task_inst)
        }
    })
})

//PUT: Update a Task by ID
app.put('/update/:id', function (req, res) {
    Task.update({_id: req.params.id}, {$push: {title: req.body.title, description: req.body.description, completed: req.body.completed}}, function(err){
        if(err){
            console.log('Something Went Wrong-display');
        } else { 
            console.log("It worked, record deleted:"); 
            res.json('updated');
        }
       })
})
app.delete('/tasks/:id', function (req, res) {
    Task.deleteOne({
        _id: req.params.id
    }, function (err) {
        if (err) {
            console.log("We have an error!", err);
            res.redirect('new');
        } else {
            res.json('tasks');
        }
    })
})

app.listen(8000, function () {
    console.log("listening on port 8000");
})