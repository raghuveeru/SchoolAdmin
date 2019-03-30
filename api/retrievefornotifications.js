const notificationRoute = require('express').Router();
const findEmails = require('find-emails-in-string');
const updateNotification = require('../db/notificationsTable');
const studentTeacher = require('../db/teacherStudentTable');


const TEACHER = 'teacher';
const NOTIFICATION = 'notification';


notificationRoute.post('/retrievefornotifications', (req, res, next) => {
    const students = [];
   
    if(!req.body[TEACHER] && !req.body[NOTIFICATION]){
        res.status(404).send({
            message: "To register a teacher and notification value is mandatory"
        });
     }else if(typeof req.body[TEACHER] === 'string' && typeof req.body[NOTIFICATION] === 'string'){        
        try {
            updateNotification([req.body[TEACHER], req.body[NOTIFICATION]], (err, data) => {
                
                 if(!err){        
                     studentTeacher.getCommonStudentsByTeachers(req.body[TEACHER], (err, data) => {
                         if(!err){                    
                             data.map(std=>{
                                 students.push(std.student);
                             });
                             let notificationData=req.body[NOTIFICATION].replace(/ @/g," ");
                             let studentEmails = findEmails(notificationData);
                             if(Array.isArray(studentEmails)){
                                 studentEmails.map(s => {students.push(s)});
                             }
                             res.status(200).json({
                                 students: students
                             });
                         }
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

module.exports = notificationRoute;