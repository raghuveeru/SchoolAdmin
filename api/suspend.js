const suspendRoute = require('express').Router();
const student = require('../db/studentTable');

const TEACHER = 'teacher';
const STUDENT = 'student';

suspendRoute.post('/suspend', (req, res, next) => {
    if(!req.body[STUDENT]){
        res.status(404).send({
            message: "To register a student value is mandatory"
        });
     }else if(typeof req.body[STUDENT] === 'string'){ 
         try {
            student.suspendStudent(req.body[STUDENT], (err, data) => {
                if(!err){                    
                    res.status(204).json();
                }else{
                    res.status(500).json({
                        error: err
                    });
                }
            }); 
         } catch (err) {
            res.status(500).json({
                message:err.message
            }); 
         }       
              
    }
});

module.exports = suspendRoute;