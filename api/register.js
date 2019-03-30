const registerRoute = require('express').Router();
const teacherTable = require('../db/teacherTable');
const studentTable = require('../db/studentTable');
const teacherStudentTable = require('../db/teacherStudentTable');
const TEACHER = 'teacher';
const STUDENTS = 'students';


registerRoute.post('/register', (req, res, next) => {
    if(!req.body[TEACHER] && !req.body[STUDENTS]){     
        res.status(404).send({
            message: "To register a student, teacher and student values are mandatory"
        });
    }else{
        if(typeof req.body[TEACHER] === 'string' && Array.isArray(req.body[STUDENTS])){

            let teacher=req.body[TEACHER];
            let students=req.body[STUDENTS];

            try{                
                teacherTable.updateTeacher(teacher, (err, teacherData) => {                       
                    if(!err){
                    students.map(e =>{
                        studentTable.updateStudent(e, (studenterr, data) => {
                            if(!studenterr){          
                                teacherStudentTable.updateTeacherStudentTable(e, teacher, (err, res) => {
                                });                                    
                            }
                        });
                    });
                }
                });
                res.status(204).json();    
            
            }catch(err) {
                res.status(500).json({
                    message:err.message
                }); 
            }

        }
        
    }
});

module.exports = registerRoute;