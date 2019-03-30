const commonStudentsRoute = require('express').Router();
const teacherStudetnTable = require('../db/teacherStudentTable');



const expectedParam = 'teacher';

commonStudentsRoute.get('/commonstudents', (req, res, next) => {
    const students = [];
    if(!req.query[expectedParam]){
        res.status(404).json({
            message: 'Expecting "teacher" param in query string to retrieve students data '
        })
    }else{        
        try
        {
            teacherStudetnTable.getCommonStudentsByTeachers(req.query[expectedParam], (err, data) => {
                if(!err){                    
                    data.map(std=>{
                        students.push(std.student);
                    });
                    res.status(200).json({
                        students: students
                    });
                }
                
            });        
    }catch(err) {
        res.status(500).json({
            message:err.message
        }); 
    }
}
});

module.exports = commonStudentsRoute;